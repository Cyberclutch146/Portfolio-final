"use client";
// components/sections/ContactSection.tsx
// Functional contact form with validation and API submission

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
    icon: "✉",
    label: "Email",
    value: "contact@swagata.dev",
    href: "mailto:contact@swagata.dev",
  },
  {
    icon: "⬛",
    label: "GitHub",
    value: "github.com/swagata-ganguly",
    href: "https://github.com/swagata-ganguly",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/swagata-ganguly",
    href: "https://linkedin.com/in/swagata-ganguly",
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

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Something went wrong");
      }

      setFormState("success");
      reset();
    } catch (err: unknown) {
      setFormState("error");
      setServerError(err instanceof Error ? err.message : "Unexpected error");
    }
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-800 to-transparent" />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label">
            <span className="w-4 h-px bg-signal inline-block" />
            contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-50 mb-4">
            Let's work together
          </h2>
          <p className="text-ink-400 max-w-sm">
            Whether it's an internship, a project collaboration, or a tutoring
            enquiry — I read every message.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left — form (3/5 width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {formState === "success" ? (
              <div className="h-full flex flex-col items-start justify-center py-12">
                <div className="w-12 h-12 rounded-full bg-circuit/15 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M5 12l5 5L20 7" stroke="#3ecfcf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-semibold text-ink-50 mb-2">
                  Message received.
                </h3>
                <p className="text-ink-400 mb-6">
                  I'll get back to you within 48 hours. Check your inbox.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="btn-ghost text-sm"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="space-y-5"
              >
                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="label-mono mb-2 block">
                      name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="input-field"
                      placeholder="Your name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 font-mono text-2xs text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="label-mono mb-2 block">
                      email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="input-field"
                      placeholder="you@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 font-mono text-2xs text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="label-mono mb-2 block">
                    subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="input-field"
                    placeholder="Internship / collaboration / tutoring..."
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="mt-1 font-mono text-2xs text-red-400">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="label-mono mb-2 block">
                    message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="input-field resize-none"
                    placeholder="Tell me what you're working on..."
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono text-2xs text-red-400">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Server error */}
                {formState === "error" && serverError && (
                  <p className="font-mono text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded px-3 py-2">
                    {serverError}
                  </p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="btn-primary w-full sm:w-auto justify-center"
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
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeOpacity="0.3"
                        />
                        <path
                          d="M12 2a10 10 0 0 1 10 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span>sending...</span>
                    </>
                  ) : (
                    <>
                      <span>send message</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Right — channels (2/5 width) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col gap-4 lg:pt-6"
          >
            <p className="label-mono mb-2">other channels</p>
            {CHANNELS.map((ch) => (
              <a
                key={ch.label}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel={ch.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-4 p-4 rounded-xl border border-ink-800 bg-ink-900/30 hover:border-ink-600 hover:bg-ink-900/60 transition-all duration-200"
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded border border-ink-700 bg-ink-800 font-mono text-xs text-ink-300 group-hover:border-signal/40 group-hover:text-signal transition-all">
                  {ch.icon}
                </div>
                <div>
                  <p className="text-ink-300 text-sm font-medium group-hover:text-ink-50 transition-colors">
                    {ch.label}
                  </p>
                  <p className="font-mono text-xs text-ink-500 mt-0.5">
                    {ch.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Response time note */}
            <div className="mt-2 p-3 rounded-lg bg-signal/5 border border-signal/15">
              <p className="font-mono text-2xs text-signal/80 leading-relaxed">
                ⏱ Typical response time: 24–48 hours. I'm in IST (UTC +5:30).
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
