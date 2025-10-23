import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, message: 'Email é obrigatório' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Não vazar info: retornar sucesso mesmo se usuário não existir
      return NextResponse.json({ success: true, message: 'Se o email existir, você receberá instruções' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      }
    });

    const link = `${process.env.NEXTAUTH_URL || ''}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
    console.log('Simulando envio de email de reset de senha:', link);

    return NextResponse.json({ success: true, message: 'Se o email existir, você receberá instruções' });
  } catch (error) {
    console.error('Erro ao criar token de reset:', error);
    return NextResponse.json({ success: false, message: 'Erro interno' }, { status: 500 });
  }
}
