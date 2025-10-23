import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { token, email, newPassword } = await request.json();
    if (!token || !email || !newPassword) {
      return NextResponse.json({ success: false, message: 'Parâmetros inválidos' }, { status: 400 });
    }

    const dbToken = await prisma.verificationToken.findUnique({ where: { token } });
    if (!dbToken || dbToken.identifier !== email) {
      return NextResponse.json({ success: false, message: 'Token inválido' }, { status: 400 });
    }

    if (dbToken.expires < new Date()) {
      return NextResponse.json({ success: false, message: 'Token expirado' }, { status: 400 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({ where: { email }, data: { password: hashed } });
    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ success: true, message: 'Senha alterada com sucesso' });
  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    return NextResponse.json({ success: false, message: 'Erro interno' }, { status: 500 });
  }
}
