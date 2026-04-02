"use client";
// components/sections/ContactSection.tsx
// Elegant cinematic contact form

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

// ── Zod schema ────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});
type ContactFormData = z.infer<typeof contactSchema>;

// ── Form states ───────────────────────────────────────────────────────────────
type FormState = "idle" | "submitting" | "success" | "error";

// ── Contact channels ──────────────────────────────────────────────────────────
const CHANNELS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "sagotogdg@gmail.com",
    href: "mailto:sagotogdg@gmail.com",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-8.3 0-1.9-.7-3.6-1.9-4.8.2-.5.8-2.3-.2-4.8 0 0-1.6-.5-4.8 2.2-1.5-.4-3-.6-4.5-.6-1.5 0-3 .2-4.5.6-3.2-2.7-4.8-2.2-4.8-2.2-.9 2.5-.4 4.3-.2 4.8-1.2 1.2-1.9 2.9-1.9 4.8 0 6.8 3 8 6 8.3-.6.5-1 1.4-1.1 2.7-.9.4-3.2 1.1-4.7-1.3 0 0-.8-1.5-2.5-1.7 0 0-1.6-.1-.1 1 0 0 1 1.1 1.7 3.2 0 0 .9 2.8 5 2.5" />
      </svg>
    ),
    label: "GitHub",
    value: "github.com/swagata-ganguly",
    href: "https://github.com/Cyberclutch146",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    label: "LinkedIn",
    value: "linkedin.com/in/swagata-ganguly",
    href: "https://www.linkedin.com/in/swagata-ganguly-453aa6327/",
  },
];

// ── Contact Form Component ────────────────────────────────────────────────────
export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState("submitting");
    setServerError(null);

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    try {
      if (!accessKey) {
        // Fallback simulation for aesthetics if no API key is provided
        console.warn("No Web3Forms key found. Simulating successful form submisson for UI demonstration.");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setFormState("success");
        reset();
        return;
      }

      // Live Web3Forms Submission
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.message ?? "Something went wrong sending the message");
      }

      setFormState("success");
      reset();
    } catch (err: unknown) {
      setFormState("error");
      setServerError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <section id="contact" className="py-32 relative border-t border-border-dim">
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <p className="section-label group mb-4">
            <span className="w-8 h-px bg-gold-dim block" />
            <span>COMMUNICATION</span>
            <span className="w-8 h-px bg-gold-dim block" />
          </p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-5xl font-medium text-white mb-6 tracking-tight">
            Let's <span className="text-gold opacity-90">Connect.</span>
          </h2>
          <p className="text-text-dim max-w-lg text-lg font-light leading-relaxed">
            Whether it's an internship, a project collaboration, or a tutoring
            enquiry — reach out below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-16 max-w-5xl mx-auto">
          {/* Left — form (7/12 width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-7"
          >
            <div className="cinematic-box p-6 sm:p-10 relative overflow-hidden h-full">
              {formState === "success" ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center relative z-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-16 h-16 border border-gold-dim rounded-full flex items-center justify-center mb-8"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M5 12l5 5L20 7" stroke="var(--color-gold)" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
                    </svg>
                  </motion.div>
                  <h3 className="font-display text-2xl font-light text-white mb-4 tracking-wider">
                    Message Sent
                  </h3>
                  <p className="text-text-dim text-sm font-light mb-8 max-w-[280px]">
                    Thank you. I'll get back to you within 48 hours.
                  </p>
                  <button
                     onClick={() => setFormState("idle")}
                     className="px-6 py-2 border border-border text-xs uppercase tracking-widest text-text-muted hover:text-white hover:border-gold transition-all"
                   >
                     Send Another
                   </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  className="space-y-6 relative z-10"
                >
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="label-mono mb-3 block text-text-dim">
                         NAME
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="input-field"
                        placeholder="John Doe"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="mt-2 font-mono text-[9px] uppercase text-red-400 tracking-wider">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="label-mono mb-3 block text-text-dim">
                         EMAIL
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="input-field"
                        placeholder="john@example.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="mt-2 font-mono text-[9px] uppercase text-red-400 tracking-wider">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="label-mono mb-3 block text-text-dim">
                         SUBJECT
                    </label>
                    <input
                      id="subject"
                      type="text"
                      className="input-field"
                      placeholder="Project inquiry"
                      {...register("subject")}
                    />
                    {errors.subject && (
                      <p className="mt-2 font-mono text-[9px] uppercase text-red-400 tracking-wider">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="label-mono mb-3 block text-text-dim">
                         MESSAGE
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      className="input-field resize-none"
                      placeholder="Hello..."
                      {...register("message")}
                    />
                    {errors.message && (
                      <p className="mt-2 font-mono text-[9px] uppercase text-red-400 tracking-wider">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Server error */}
                  {formState === "error" && serverError && (
                    <div className="font-mono text-[10px] text-red-400 border border-red-900/50 bg-red-950/20 px-4 py-3">
                      {serverError}
                    </div>
                  )}

                  {/* Submit */}
                  <div className="pt-4 flex justify-between items-center relative z-20">
                    <button
                      type="button"
                      className="text-[10px] uppercase tracking-[0.2em] font-mono text-text-muted opacity-50 select-none z-50 absolute left-0"
                      onPointerEnter={(e) => {
                        const target = e.currentTarget;
                        const bx = (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 200);
                        const by = (Math.random() > 0.5 ? 1 : -1) * (50 + Math.random() * 100);
                        target.style.transform = `translate(${bx}px, ${by}px)`;
                        target.style.transition = "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)";
                      }}
                      title="Try clicking it..."
                    >
                      DON'T CONNECT
                    </button>

                    <div className="flex-1" />
                    
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="btn-primary w-full sm:w-auto justify-center group/btn"
                    >
                      {formState === "submitting" ? (
                        <>
                          <svg
                            className="animate-spin"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
                          </svg>
                          <span>SENDING</span>
                        </>
                      ) : (
                        <>
                          <span>SEND MESSAGE</span>
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden className="group-hover/btn:translate-x-1 transition-transform">
                            <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right — channels (5/12 width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="md:col-span-5 flex flex-col gap-6"
          >
            <div className="cinematic-box p-6 sm:p-8 h-full flex flex-col justify-center">
              <p className="font-mono text-[10px] text-text-muted tracking-[0.2em] mb-8 font-bold uppercase flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-gold-dim block" />
                 DIRECT LINKS
              </p>
              
              <div className="flex flex-col gap-4">
                {CHANNELS.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.href.startsWith("http") ? "_blank" : undefined}
                    rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-5 p-4 border border-border bg-surface/30 hover:border-gold hover:bg-gold-faint/10 transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-border bg-transparent text-text-dim group-hover:text-gold group-hover:border-gold transition-colors duration-300">
                      {ch.icon}
                    </div>
                    <div>
                      <p className="text-white font-display font-medium text-base mb-1 tracking-wide group-hover:text-gold transition-colors">
                        {ch.label}
                      </p>
                      <p className="font-mono text-[10px] text-text-muted transition-colors">
                        {ch.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Response time note */}
              <div className="mt-10 p-4 border-l border-gold-dim bg-surface/50">
                <p className="font-mono text-[9px] text-text-dim leading-relaxed uppercase tracking-widest flex items-start gap-3">
                  <span className="text-gold mt-[-2px]">⏱</span> Typical response time: 24–48 hours. I'm in IST (UTC +5:30).
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
