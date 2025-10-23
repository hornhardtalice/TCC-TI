'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/hooks/useFavorites';
import { DestinationCard } from '@/components/destinos/DestinationCard';

export default function FavoritesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { favorites, isLoading, error } = useFavorites();

  useEffect(() => {
    if (!session?.user) {
      router.push('/login');
    }
  }, [session, router]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4 mx-auto"></div>
          <p className="text-gray-600">Carregando seus favoritos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Erro ao carregar favoritos</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Meus Favoritos</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">
            Você ainda não tem destinos favoritos
          </p>
          <p className="text-gray-500 mb-6">
            Explore destinos e salve seus favoritos para encontrá-los facilmente depois
          </p>
          <button
            onClick={() => router.push('/destinos/busca')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Explorar Destinos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((destination) => (
            <div key={destination.id} className="relative group">
              <DestinationCard
                destination={destination}
              />
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => {/* Função para remover dos favoritos */}}
                  className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                  aria-label="Remover dos favoritos"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
