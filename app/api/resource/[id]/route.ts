import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const resource = await prisma.resource.findUnique({
      where: { id: Number(id) },
    });
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found." },
        { status: 400 }
      );
    }
    return NextResponse.json(resource, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resource." },
      { status: 500 }
    );
  }
}
