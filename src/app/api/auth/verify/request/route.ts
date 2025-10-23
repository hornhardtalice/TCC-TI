import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth/auth.config';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ success: false, message: 'Não autorizado' }, { status: 401 });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    await prisma.verificationToken.create({
      data: {
        identifier: session.user.email,
        token,
        expires,
      }
    });

    // Aqui você integraria com um serviço de email. Por enquanto apenas logamos o link.
    const link = `${process.env.NEXTAUTH_URL || ''}/auth/verify?token=${token}&email=${encodeURIComponent(session.user.email)}`;
    console.log('Simulando envio de e-mail de verificação:', link);

    return NextResponse.json({ success: true, message: 'Token de verificação enviado (simulado)' });
  } catch (error) {
    console.error('Erro ao criar token de verificação:', error);
    return NextResponse.json({ success: false, message: 'Erro interno' }, { status: 500 });
  }
}
