import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
};

export class UserStore {
  async createUser(name: string, email: string, password: string): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Verifica se o email já está em uso
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      throw new Error('Email já cadastrado');
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    // Não retorna a senha
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  async verifyPassword(user: User, password: string): Promise<boolean> {
    if (!user.password) return false;
    return bcrypt.compare(password, user.password);
  }

  async updateProfile(userId: string, data: { name?: string, email?: string }) {
    return prisma.user.update({
      where: { id: userId },
      data
    });
  }
}

export const userStore = new UserStore();
