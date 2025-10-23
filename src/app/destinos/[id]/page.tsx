'use client';

import { useState, useEffect } from 'react';
import { DestinationType } from '@/types/destination';
import { Hotel, Restaurant, TouristSpot } from '@/types/places';
import Image from 'next/image';
import Link from 'next/link';
import { mockDestinations } from '@/data/mockDestinations';
import { notFound } from 'next/navigation';

export default function DestinationPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const destination = mockDestinations.find(d => d.id === params.id) as DestinationType;

  useEffect(() => {
    // Simula carregamento dos dados
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
          <p>Carregando destino...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    notFound();
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <Link href="/destinos/busca" className="text-blue-600 hover:underline mt-4 block">
            Voltar para busca
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-8 rounded-xl overflow-hidden">
        <Image
          src={destination.photos?.[0] ?? '/images/placeholder.jpg'}
          alt={destination.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
            <p className="text-xl">
              {destination.location.city}, {destination.location.country}
            </p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Sobre</h2>
            <p className="text-gray-700">{destination.description}</p>
          </section>

          {/* Tourist Spots */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Pontos Turísticos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(destination.touristSpots as TouristSpot[] ?? []).map(spot => (
                <div key={spot.id} className="bg-white rounded-lg shadow p-4">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={spot.photos?.[0] ?? '/images/placeholder.jpg'}
                      alt={spot.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{spot.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{spot.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>⭐ {spot.rating.score.toFixed(1)}</span>
                    <span className="mx-2">•</span>
                    <span>{spot.suggestedDuration}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Hotels */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Hotéis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(destination.hotels as Hotel[] ?? []).map(hotel => (
                <div key={hotel.id} className="bg-white rounded-lg shadow p-4">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={hotel.photos?.[0] ?? '/images/placeholder.jpg'}
                      alt={hotel.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                    <div className="flex">
                      {'★'.repeat(hotel.stars)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{hotel.description}</p>
                  <p className="text-sm font-semibold">
                    A partir de {hotel.priceRange.min.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: hotel.priceRange.currency
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Restaurants */}
          <section>
            <h2 className="text-2xl font-semibold mb-4">Restaurantes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(destination.restaurants as Restaurant[] ?? []).map(restaurant => (
                <div key={restaurant.id} className="bg-white rounded-lg shadow p-4">
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={restaurant.photos?.[0] ?? '/images/placeholder.jpg'}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{restaurant.description}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {restaurant.cuisine.map((type: string) => (
                      <span
                        key={type}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm">
                    Faixa de preço: {restaurant.priceRange.min.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: restaurant.priceRange.currency
                    })} - {restaurant.priceRange.max.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: restaurant.priceRange.currency
                    })}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Weather */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-lg mb-3">Clima</h3>
            <p className="text-sm text-gray-600 mb-2">{destination.weather.climate}</p>
            <h4 className="font-medium text-sm mb-1">Melhor época para visitar:</h4>
            <ul className="text-sm text-gray-600">
              {destination.weather.bestTimeToVisit.map(time => (
                <li key={time}>{time}</li>
              ))}
            </ul>
          </div>

          {/* Accessibility */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-lg mb-3">Acessibilidade</h3>
            <p className="text-sm text-gray-600 mb-3">
              {destination.accessibility.overall.description}
            </p>
            <div className="space-y-2">
              {destination.accessibility.overall.wheelchair && (
                <div className="flex items-center">
                  <span className="mr-2">♿</span>
                  <span className="text-sm">Acessível para cadeirantes</span>
                </div>
              )}
              {destination.accessibility.overall.visualAids && (
                <div className="flex items-center">
                  <span className="mr-2">👁️</span>
                  <span className="text-sm">Recursos para deficientes visuais</span>
                </div>
              )}
              {destination.accessibility.overall.hearingAids && (
                <div className="flex items-center">
                  <span className="mr-2">👂</span>
                  <span className="text-sm">Recursos para deficientes auditivos</span>
                </div>
              )}
              {destination.accessibility.publicTransport && (
                <div className="flex items-center">
                  <span className="mr-2">🚌</span>
                  <span className="text-sm">Transporte público acessível</span>
                </div>
              )}
              {destination.accessibility.accessibleTaxis && (
                <div className="flex items-center">
                  <span className="mr-2">🚕</span>
                  <span className="text-sm">Táxis adaptados disponíveis</span>
                </div>
              )}
            </div>
          </div>

          {/* Practical Info */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-semibold text-lg mb-3">Informações Práticas</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Moeda local:</strong> {destination.localCurrency}</p>
              <p><strong>Idiomas:</strong> {destination.languages?.join(', ') ?? 'Não informado'}</p>
              <p><strong>Fuso horário:</strong> {destination.timeZone}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
