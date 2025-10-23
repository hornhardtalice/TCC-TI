import Image from 'next/image';
import Link from 'next/link';
import { Place } from '@/types';
import { useFavorites } from '@/hooks/useFavorites';
import { useSession } from 'next-auth/react';

interface DestinationCardProps {
  destination: Place;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const { name, description, photos, rating, location } = destination;
  const { data: session } = useSession();
  const { toggleFavorite, isFavorite } = useFavorites();
  const router = useRouter();
  const isFavorited = isFavorite(destination.id);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session?.user) {
      router.push('/login');
      return;
    }

    await toggleFavorite(destination.id);
  };

  return (
    <div className="relative group">
      <Link href={`/destinos/${destination.id}`} role="link" aria-label={`Ver detalhes de ${name}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48 w-full">
            <Image
              src={photos?.[0] || '/images/placeholder.jpg'}
              alt={`Foto principal de ${name}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-gray-600">{rating.score.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            {`${location.city}, ${location.state}, ${location.country}`}
          </p>
          <p className="text-gray-500 text-sm line-clamp-2">
            {description}
          </p>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-2">
              {destination.accessibility?.overall.wheelchair && (
                <span className="text-blue-600" title="Acessível para cadeirantes">♿</span>
              )}
              {(destination.hotels ?? []).length > 0 && (
                <span className="text-blue-600" title="Hotéis disponíveis">🏨</span>
              )}
              {(destination.restaurants ?? []).length > 0 && (
                <span className="text-blue-600" title="Restaurantes">🍽️</span>
              )}
            </div>
            <span className="text-sm text-blue-600 hover:text-blue-800">
              Ver detalhes →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
