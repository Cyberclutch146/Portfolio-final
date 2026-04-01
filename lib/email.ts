// lib/email.ts
// Email notification helper using Nodemailer
// Sends you a notification when someone submits the contact form

import nodemailer from "nodemailer";

interface ContactNotificationParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ── Create transporter ────────────────────────────────────────────────────────
// Supports Gmail (via app password), SMTP relay, or any provider
function createTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env;

  // If SMTP vars aren't set, skip (e.g. in development without email config)
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("[email] SMTP credentials not configured. Emails will not be sent.");
    return null;
  }

  return nodemailer.createTransport({
    host:   SMTP_HOST ?? "smtp.gmail.com",
    port:   parseInt(SMTP_PORT ?? "587"),
    secure: SMTP_PORT === "465",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

// ── Send contact notification ─────────────────────────────────────────────────
export async function sendContactNotification({
  name,
  email,
  subject,
  message,
}: ContactNotificationParams): Promise<void> {
  const transporter = createTransporter();
  if (!transporter) return;

  const { SMTP_FROM, PORTFOLIO_EMAIL } = process.env;
  const from = SMTP_FROM ?? `"Portfolio Contact" <${process.env.SMTP_USER}>`;
  const to   = PORTFOLIO_EMAIL ?? process.env.SMTP_USER!;

  await transporter.sendMail({
    from,
    to,
    replyTo: `"${name}" <${email}>`,
    subject: `[Portfolio] ${subject}`,
    text: [
      `New message from ${name} <${email}>`,
      `Subject: ${subject}`,
      ``,
      message,
      ``,
      `---`,
      `Sent via swagata.dev contact form`,
    ].join("\n"),
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'JetBrains Mono', monospace; background: #0a0a0b; color: #f0f0f5; padding: 32px; }
            .container { max-width: 560px; margin: 0 auto; }
            .header { border-bottom: 1px solid #2e2e34; padding-bottom: 16px; margin-bottom: 24px; }
            .label { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #55555f; margin-bottom: 4px; }
            .value { font-size: 14px; color: #f0f0f5; margin-bottom: 16px; }
            .message-body { background: #1a1a1e; border: 1px solid #2e2e34; border-radius: 8px; padding: 20px; font-size: 14px; line-height: 1.7; color: #a8a8b8; white-space: pre-wrap; }
            .footer { margin-top: 24px; font-size: 11px; color: #3d3d45; }
            .accent { color: #e8b94a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <p class="accent" style="font-size:12px; letter-spacing:0.1em; text-transform:uppercase; margin:0 0 4px;">portfolio contact form</p>
              <h2 style="margin:0; font-size:20px; font-weight:700;">${subject}</h2>
            </div>
            <div class="label">from</div>
            <div class="value">${name} &lt;<a href="mailto:${email}" style="color:#3ecfcf;">${email}</a>&gt;</div>
            <div class="label">message</div>
            <div class="message-body">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            <div class="footer">Reply to this email to respond directly to ${name}.</div>
          </div>
        </body>
      </html>
    `,
  });
}
