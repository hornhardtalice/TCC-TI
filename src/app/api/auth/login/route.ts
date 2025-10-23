import { NextResponse } from 'next/server';
import { userStore } from '@/lib/auth/users';
import { generateToken } from '@/lib/auth/jwt';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const user = await userStore.findByEmail(email);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const isValid = await userStore.verifyPassword(user, password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email ?? email,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email ?? email,
      },
      token,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
