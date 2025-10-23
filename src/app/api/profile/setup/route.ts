import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth.config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: 'Não autorizado' },
        { status: 401 }
      );
    }

    const { bio, location, website } = await request.json();

    const profile = await prisma.profile.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        bio,
        location,
        website,
      },
      create: {
        userId: session.user.id,
        bio,
        location,
        website,
      },
    });

    return NextResponse.json({ success: true, profile });
  } catch (error) {
    console.error('Erro ao configurar perfil:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
