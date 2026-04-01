"use client";
import React, { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';
import './SoftAurora.css';

interface SoftAuroraProps {
  speed?: number;
  scale?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  noiseFrequency?: number;
  noiseAmplitude?: number;
  bandHeight?: number;
  bandSpread?: number;
  octaveDecay?: number;
  layerOffset?: number;
  colorSpeed?: number;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
}

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uScale;
  uniform float uBrightness;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform float uNoiseFrequency;
  uniform float uNoiseAmplitude;
  uniform float uBandHeight;
  uniform float uBandSpread;
  uniform float uOctaveDecay;
  uniform float uLayerOffset;
  uniform float uColorSpeed;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;

  float quintic(float t) {
    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
  }

  vec3 hash(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    vec3 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(mix(dot(hash(i + vec3(0,0,0)), f - vec3(0,0,0)),
                       dot(hash(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
                   mix(dot(hash(i + vec3(0,1,0)), f - vec3(0,1,0)),
                       dot(hash(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
               mix(mix(dot(hash(i + vec3(0,0,1)), f - vec3(0,0,1)),
                       dot(hash(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
                   mix(dot(hash(i + vec3(0,1,1)), f - vec3(0,1,1)),
                       dot(hash(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y), u.z);
  }

  void main() {
    vec2 st = vUv * 2.0 - 1.0;
    st.x *= uScale;

    float distToMouse = distance(vUv, uMouse);
    float mouseEffect = exp(-distToMouse * 5.0) * uMouseInfluence;

    float t = uTime * uSpeed;
    float n = 0.0;
    float amp = uNoiseAmplitude + mouseEffect;
    float freq = uNoiseFrequency;

    for(int i = 0; i < 3; i++) {
        n += noise(vec3(st * freq, t + float(i) * uLayerOffset)) * amp;
        amp *= uOctaveDecay;
        freq *= 2.0;
    }

    float aurora = smoothstep(uBandHeight - uBandSpread, uBandHeight, n) * 
                   smoothstep(uBandHeight + uBandSpread, uBandHeight, n);
    
    float colorShift = (sin(uTime * uColorSpeed + n * 2.0) * 0.5 + 0.5);
    vec3 finalColor = mix(uColor1, uColor2, colorShift) * aurora * uBrightness;

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

const SoftAurora = ({
  speed = 0.6,
  scale = 1.5,
  brightness = 1,
  color1 = "#f7f7f7",
  color2 = "#e100ff",
  noiseFrequency = 2.5,
  noiseAmplitude = 1,
  bandHeight = 0.5,
  bandSpread = 1,
  octaveDecay = 0.1,
  layerOffset = 0,
  colorSpeed = 1,
  enableMouseInteraction = true,
  mouseInfluence = 0.25,
}: SoftAuroraProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    containerRef.current.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uBrightness: { value: brightness },
        uColor1: { value: new Color(color1) },
        uColor2: { value: new Color(color2) },
        uNoiseFrequency: { value: noiseFrequency },
        uNoiseAmplitude: { value: noiseAmplitude },
        uBandHeight: { value: bandHeight },
        uBandSpread: { value: bandSpread },
        uOctaveDecay: { value: octaveDecay },
        uLayerOffset: { value: layerOffset },
        uColorSpeed: { value: colorSpeed },
        uMouse: { value: [0.5, 0.5] },
        uMouseInfluence: { value: mouseInfluence },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const handleResize = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      renderer.setSize(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableMouseInteraction || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = (e.clientX - rect.left) / rect.width;
      mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    window.addEventListener('resize', handleResize);
    if (enableMouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    handleResize();

    let requestId: number;
    const update = (time: number) => {
      program.uniforms.uTime.value = time * 0.001;
      program.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];
      renderer.render({ scene: mesh });
      requestId = requestAnimationFrame(update);
    };

    requestId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(requestId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current && gl.canvas.parentNode) {
        containerRef.current.removeChild(gl.canvas);
      }
    };
  }, [
    speed, scale, brightness, color1, color2, noiseFrequency, noiseAmplitude,
    bandHeight, bandSpread, octaveDecay, layerOffset, colorSpeed,
    enableMouseInteraction, mouseInfluence
  ]);

  return <div ref={containerRef} className="soft-aurora-container" style={{ width: '100%', height: '100%' }} />;
};

export default SoftAurora;
