import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const courses = await prisma.course.findMany({ where: { isActive: true }, orderBy: { title: "asc" } });
  return NextResponse.json({ courses: courses.map((c) => ({ id: c.id, title: c.title })) });
}
