import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { Place } from '@/types';

interface FavoritePlace extends Place {
  createdAt: string;
}

interface UseFavoritesReturn {
  favorites: FavoritePlace[];
  isLoading: boolean;
  error: string | null;
  toggleFavorite: (placeId: string) => Promise<void>;
  isFavorite: (placeId: string) => boolean;
  refetchFavorites: () => Promise<void>;
}

export function useFavorites(): UseFavoritesReturn {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<FavoritePlace[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (!session?.user) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/favorites');
      if (!response.ok) {
        throw new Error('Erro ao buscar favoritos');
      }
      const data = await response.json();
      setFavorites(data.map((fav: any) => ({
        ...fav.place,
        createdAt: fav.createdAt
      })));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar favoritos');
    } finally {
      setIsLoading(false);
    }
  }, [session?.user]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const toggleFavorite = async (placeId: string) => {
    if (!session?.user) {
      setError('Você precisa estar logado para favoritar um destino');
      return;
    }

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId }),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar favorito');
      }

      // Atualiza a lista de favoritos
      await fetchFavorites();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar favorito');
    }
  };

  const isFavorite = useCallback((placeId: string) => {
    return favorites.some(fav => fav.id === placeId);
  }, [favorites]);

  return {
    favorites,
    isLoading,
    error,
    toggleFavorite,
    isFavorite,
    refetchFavorites: fetchFavorites
  };
}
