'use client';

import { motion, useMotionValue, useSpring, useTransform, MotionValue, SpringOptions } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

import './Dock.css';

interface DockItemProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
}

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseDistance = useTransform(mouseX, val => {
    if (val === Infinity) return Infinity;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    return val - rect.x - rect.width / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
    >
      <div className="dock-icon">{children}</div>
      {isHovered && (
        <motion.div
          className="dock-label"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          transition={{ duration: 0.15 }}
        >
          {className}
        </motion.div>
      )}
    </motion.div>
  );
}

interface DockIconProps {
  children: React.ReactNode;
}

function DockIcon({ children }: DockIconProps) {
  return <div className="dock-icon-inner">{children}</div>;
}

export interface DockItemData {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface DockProps {
  items: DockItemData[];
  className?: string;
  spring?: SpringOptions;
  magnification?: number;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.5, stiffness: 150, damping: 15 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  baseItemSize = 50
}: DockProps) {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const dockRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!dockRef.current) return;
    isHovered.set(1);
    mouseX.set(e.clientX);
  }, [mouseX, isHovered]);

  const handleMouseLeave = useCallback(() => {
    isHovered.set(0);
    mouseX.set(Infinity);
  }, [mouseX, isHovered]);

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, panelHeight * 1.2]);
  const height = useSpring(heightRow, spring);

  if (!mounted) return null;

  return (
    <motion.div 
      style={{ height, scrollbarWidth: 'none' }} 
      className="dock-outer"
    >
      <motion.div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`dock-panel ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Social links dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.label}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            {item.icon}
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
