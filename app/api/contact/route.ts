// app/api/contact/route.ts
// Contact form API endpoint
// Saves message to DB and optionally sends email notification

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendContactNotification } from "@/lib/email";

// ── Input validation schema ───────────────────────────────────────────────────
const contactSchema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email().max(254),
  subject: z.string().min(4).max(200),
  message: z.string().min(20).max(4000),
});

// ── Rate limiting (simple in-memory, use Redis for production) ───────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;       // max 3 submissions
const WINDOW_MS = 60_000;   // per 60 seconds per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true; // allowed
  }

  if (entry.count >= RATE_LIMIT) return false; // blocked

  entry.count++;
  return true; // allowed
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    // Parse and validate body
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;

    // Save to database
    const saved = await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });

    // Send email notification (non-blocking — don't fail the request if email fails)
    sendContactNotification({ name, email, subject, message }).catch((err) => {
      console.error("[email] Notification failed:", err);
    });

    return NextResponse.json(
      { success: true, id: saved.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("[api/contact] Error:", err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// ── GET /api/contact — fetch all messages (protected, dev-only) ──────────────
export async function GET(req: NextRequest) {
  // Simple admin key guard — replace with proper auth in production
  const adminKey = req.headers.get("x-admin-key");
  if (adminKey !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ messages });
}
