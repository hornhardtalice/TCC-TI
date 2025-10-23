import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { PlaceCategory } from '@/types';

export interface SearchParams {
  query?: string;
  page: number;
  limit: number;
  accessibility?: boolean;
  hasHotels?: boolean;
  hasRestaurants?: boolean;
  minRating?: number;
  category?: PlaceCategory;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    
    const params: SearchParams = {
      query: searchParams.get('query') || undefined,
      page,
      limit,
      accessibility: searchParams.get('accessibility') === 'true',
      hasHotels: searchParams.get('hasHotels') === 'true',
      hasRestaurants: searchParams.get('hasRestaurants') === 'true',
      minRating: Number(searchParams.get('minRating')) || 0,
      category: (searchParams.get('category') as PlaceCategory) || undefined
    };

    const conditions: Prisma.PlaceWhereInput[] = [];

    if (params.query) {
      conditions.push({
        OR: [
          { name: { contains: params.query, mode: 'insensitive' as const } },
          { description: { contains: params.query, mode: 'insensitive' as const } }
        ]
      });
    }

    if (params.minRating && params.minRating > 0) {
      conditions.push({ ratingScore: { gte: params.minRating } });
    }

    if (params.category) {
      conditions.push({ category: params.category });
    }

    const where: Prisma.PlaceWhereInput = conditions.length > 0 ? { AND: conditions } : {};

    // Buscar total de resultados para paginação
    const total = await prisma.place.count({ where });

    // Buscar lugares com paginação
    const places = await prisma.place.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        reviews: {
          include: {
            user: true
          }
        },
        favorites: true,
        _count: {
          select: {
            reviews: true,
            favorites: true
          }
        }
      },
      orderBy: {
        ratingScore: 'desc'
      }
    });

    // Formatar resposta
    const formattedPlaces = places.map((place: any) => ({
      id: place.id,
      name: place.name,
      description: place.description,
      imageUrl: place.imageUrl,
      location: {
        city: place.locationCity,
        state: place.locationState,
        country: place.locationCountry
      },
      category: place.category as PlaceCategory,
      rating: {
        score: place.ratingScore,
        count: place.ratingCount,
        reviews: place.reviews
      },
      price: place.price,
      latitude: place.latitude,
      longitude: place.longitude,
      reviewCount: place._count.reviews,
      favoriteCount: place._count.favorites
    }));

    return NextResponse.json({
      places: formattedPlaces,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('Erro ao buscar destinos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar destinos' },
      { status: 500 }
    );
  }
}
