import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const ceoNumber = '+971508220450';
    
    // Check if exists
    let user = await prisma.user.findFirst({
      where: { phone: ceoNumber }
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: 'Dr. Belal (CEO)',
          balance: 999999.99,
          status: 'Active',
          lastLocation: 'Dubai, UAE'
        }
      });
    } else {
      user = await prisma.user.create({
        data: {
          email: 'ceo@mpowerspace.ai',
          phone: ceoNumber,
          name: 'Dr. Belal (CEO)',
          balance: 999999.99,
          status: 'Active',
          lastLocation: 'Dubai, UAE'
        }
      });
    }

    return NextResponse.json({ success: true, message: 'CEO Number provisioned successfully', user });
  } catch (error) {
    console.error('Failed to provision CEO:', error);
    return NextResponse.json({ error: 'Failed to provision CEO' }, { status: 500 });
  }
}