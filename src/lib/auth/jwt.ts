import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Em produção, use variável de ambiente

export interface UserToken {
  id: string;
  email: string;
}

export const generateToken = (user: UserToken): string => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '1d', // Token expira em 1 dia
  });
};

export const verifyToken = (token: string): UserToken | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as UserToken;
  } catch {
    return null;
  }
};

export const getTokenFromHeader = (req: NextRequest): string | null => {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.split(' ')[1];
};

export const unauthorized = (message = 'Não autorizado') => {
  return NextResponse.json(
    { success: false, message },
    { status: 401 }
  );
};

export const forbidden = (message = 'Acesso negado') => {
  return NextResponse.json(
    { success: false, message },
    { status: 403 }
  );
};
