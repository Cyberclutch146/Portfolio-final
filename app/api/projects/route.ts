// app/api/projects/route.ts
// Projects API — returns all or featured projects from DB

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get("featured") === "true";
  const category = searchParams.get("category");

  try {
    const projects = await prisma.project.findMany({
      where: {
        ...(featured ? { featured: true } : {}),
        ...(category ? { category: category as any } : {}),
      },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ projects });
  } catch (err) {
    console.error("[api/projects] Error:", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
