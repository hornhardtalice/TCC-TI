import { NextResponse } from 'next/server';
import { userStore } from '@/lib/auth/users';
import { validateEmail, validatePassword, validateName } from '@/lib/utils/validation';
import { signIn } from 'next-auth/react';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validações
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      return NextResponse.json(
        { success: false, message: nameValidation.message },
        { status: 400 }
      );
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { success: false, message: emailValidation.message },
        { status: 400 }
      );
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { success: false, message: passwordValidation.message },
        { status: 400 }
      );
    }

    // Criar usuário com Prisma
    const user = await userStore.createUser(name, email, password);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'Email já cadastrado') {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }

    console.error('Erro no cadastro:', error);
    return NextResponse.json(
      { success: false, message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
