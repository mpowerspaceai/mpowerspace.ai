import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, phone, companyWebsite } = await req.json();

    if (!email || !phone) {
      return NextResponse.json({ error: "Email and phone are required" }, { status: 400 });
    }

    const request = await prisma.businessPlanRequest.create({
      data: {
        email,
        phone,
        companyWebsite,
        status: "Pending"
      }
    });

    return NextResponse.json({ success: true, request });
  } catch (error) {
    console.error("Error creating business plan request:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}