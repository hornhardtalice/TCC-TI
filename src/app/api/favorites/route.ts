import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/auth.config';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Você precisa estar logado para favoritar um destino' },
        { status: 401 }
      );
    }

    const { placeId } = await request.json();
    if (!placeId) {
      return NextResponse.json(
        { error: 'ID do destino é obrigatório' },
        { status: 400 }
      );
    }

    // Verifica se o destino existe
    const place = await prisma.place.findUnique({
      where: { id: placeId }
    });

    if (!place) {
      return NextResponse.json(
        { error: 'Destino não encontrado' },
        { status: 404 }
      );
    }

    // Procura se já existe um favorito
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_placeId: {
          userId: session.user.id,
          placeId: placeId
        }
      }
    });

    if (existingFavorite) {
      // Se existir, remove o favorito
      await prisma.favorite.delete({
        where: {
          userId_placeId: {
            userId: session.user.id,
            placeId: placeId
          }
        }
      });
      return NextResponse.json({ favorited: false });
    } else {
      // Se não existir, cria um novo favorito
      await prisma.favorite.create({
        data: {
          userId: session.user.id,
          placeId: placeId
        }
      });
      return NextResponse.json({ favorited: true });
    }
  } catch (error) {
    console.error('Erro ao gerenciar favorito:', error);
    return NextResponse.json(
      { error: 'Erro ao processar a solicitação' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Você precisa estar logado para ver seus favoritos' },
        { status: 401 }
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        place: {
          select: {
            id: true,
            name: true,
            description: true,
            imageUrl: true,
            locationCity: true,
            locationState: true,
            ratingScore: true,
            ratingCount: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar favoritos' },
      { status: 500 }
    );
  }
}
