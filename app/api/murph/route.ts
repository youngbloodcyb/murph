import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const record = await prisma.murph.create({
    data,
  });

  return NextResponse.json(record);
}
