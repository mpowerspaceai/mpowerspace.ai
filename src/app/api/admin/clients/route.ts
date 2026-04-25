import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const clients = await prisma.user.findMany({
      include: {
        callLogs: {
          orderBy: { startedAt: 'desc' },
          take: 5 // Get the 5 most recent calls for quick inspection
        },
        _count: {
          select: { callLogs: true }
        }
      },
      orderBy: {
        lastActive: 'desc'
      }
    });

    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Failed to fetch clients' }, { status: 500 });
  }
}
