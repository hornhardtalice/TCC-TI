import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    const email = url.searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json({ success: false, message: 'Parâmetros inválidos' }, { status: 400 });
    }

    const dbToken = await prisma.verificationToken.findUnique({ where: { token } });
    if (!dbToken || dbToken.identifier !== email) {
      return NextResponse.json({ success: false, message: 'Token inválido' }, { status: 400 });
    }

    if (dbToken.expires < new Date()) {
      return NextResponse.json({ success: false, message: 'Token expirado' }, { status: 400 });
    }

    // Marca o email como verificado no usuário
    await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() }
    });

    // Remove token
    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ success: true, message: 'Email verificado com sucesso' });
  } catch (error) {
    console.error('Erro ao confirmar verificação:', error);
    return NextResponse.json({ success: false, message: 'Erro interno' }, { status: 500 });
  }
}
