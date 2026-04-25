import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const logs = await prisma.callLog.findMany({
      orderBy: { startedAt: 'desc' },
      take: 50,
      include: {
        user: {
          select: {
            name: true,
            phone: true,
          }
        }
      }
    });

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Failed to fetch call logs:", error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}