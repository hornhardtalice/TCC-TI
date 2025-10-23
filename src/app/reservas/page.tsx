import Image from 'next/image';
import Link from 'next/link';
import { mockDestinations } from '@/data/mockDestinations';
import { Hotel, Restaurant } from '@/types/places';

const hotels: Hotel[] = mockDestinations.flatMap((destination) => destination.hotels ?? []);
const restaurants: Restaurant[] = mockDestinations.flatMap((destination) => destination.restaurants ?? []);

export default function ReservationsPage() {
  return (
    <div className="bg-white">
      <section className="bg-gradient-to-r from-primary to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">Planeje suas reservas com facilidade</h1>
          <p className="text-lg text-white/90">
            Encontre hotéis e restaurantes com curadoria, avaliações reais e recursos acessíveis para todos os viajantes.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 space-y-16">
        <div>
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">Hotéis recomendados</h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Veja opções com detalhes de acessibilidade, faixa de preço e avaliações dos hóspedes.
              </p>
            </div>
            <Link
              href="/destinos/busca?categoria=HOTEL"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              Buscar mais hotéis
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <article key={hotel.id} className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={hotel.photos?.[0] ?? '/images/placeholder.jpg'}
                    alt={`Foto do hotel ${hotel.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <header className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                      <p className="text-sm text-gray-500">
                        {hotel.location.city}, {hotel.location.state}
                      </p>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <span className="sr-only">Classificação</span>
                      {'★'.repeat(hotel.stars)}
                    </div>
                  </header>
                  <p className="text-sm text-gray-600 line-clamp-3">{hotel.description}</p>
                  <p className="text-sm font-medium text-gray-900">
                    Faixa de preço: {hotel.priceRange.min.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: hotel.priceRange.currency,
                    })}
                    {' '}
                    -
                    {' '}
                    {hotel.priceRange.max.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: hotel.priceRange.currency,
                    })}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-blue-600">
                    {hotel.accessibility?.overall.wheelchair && (
                      <span className="px-3 py-1 bg-blue-50 rounded-full">Acessível para cadeiras de rodas</span>
                    )}
                    {hotel.accessibility?.publicTransport && (
                      <span className="px-3 py-1 bg-blue-50 rounded-full">Transporte acessível</span>
                    )}
                  </div>
                  <Link
                    href={`/destinos/${hotel.location.city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-semibold"
                  >
                    Ver destino completo
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-900">Restaurantes imperdíveis</h2>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Descubra experiências gastronômicas com cardápios acessíveis e avaliações de viajantes.
              </p>
            </div>
            <Link
              href="/destinos/busca?categoria=RESTAURANT"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
            >
              Buscar restaurantes
            </Link>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {restaurants.map((restaurant) => (
              <article key={restaurant.id} className="rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={restaurant.photos?.[0] ?? '/images/placeholder.jpg'}
                    alt={`Foto do restaurante ${restaurant.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <header className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{restaurant.name}</h3>
                      <p className="text-sm text-gray-500">
                        {restaurant.location.city}, {restaurant.location.state}
                      </p>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <span className="text-sm font-semibold">
                        ⭐ {restaurant.rating.score.toFixed(1)}
                      </span>
                    </div>
                  </header>
                  <p className="text-sm text-gray-600 line-clamp-3">{restaurant.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-blue-600">
                    {restaurant.cuisine.map((type) => (
                      <span key={type} className="px-3 py-1 bg-blue-50 rounded-full">
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    Faixa de preço: {restaurant.priceRange.min.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: restaurant.priceRange.currency,
                    })}
                    {' '}
                    -
                    {' '}
                    {restaurant.priceRange.max.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: restaurant.priceRange.currency,
                    })}
                  </p>
                  <Link
                    href={`/destinos/${restaurant.location.city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-semibold"
                  >
                    Ver destino completo
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
