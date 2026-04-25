import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // Find the user by phone number
    const user = await prisma.user.findFirst({
      where: { phone }
    });

    if (!user) {
      return NextResponse.json({ 
        exists: false, 
        message: 'Number not provisioned. Please contact Admin.' 
      }, { status: 404 });
    }

    // Return the user status and balance to the Mobile App
    return NextResponse.json({ 
      exists: true,
      status: user.status,
      balance: user.balance,
      lastActive: user.lastActive
    });

  } catch (error) {
    console.error('Error verifying client:', error);
    return NextResponse.json({ error: 'Failed to verify client' }, { status: 500 });
  }
}