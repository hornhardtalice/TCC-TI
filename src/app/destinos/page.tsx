'use client';

import Link from 'next/link';
import { DestinationCard } from '@/components/destinos/DestinationCard';
import { mockDestinations } from '@/data/mockDestinations';

export default function DestinationsIndexPage() {
  return (
    <div className="bg-slate-50">
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="uppercase tracking-wide text-sm font-semibold text-white/80 mb-3">
            Descubra locais incríveis
          </p>
          <h1 className="text-4xl font-bold mb-4">
            Destinos acessíveis e experiências autênticas
          </h1>
          <p className="text-lg text-white/90">
            Explore cidades, hotéis e restaurantes com avaliações de viajantes reais
            e informações completas de acessibilidade.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 space-y-12">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">Destinos em destaque</h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Escolha um destino para visualizar detalhes completos, incluindo hotéis, restaurantes,
              pontos turísticos e recursos de acessibilidade.
            </p>
          </div>
          <Link
            href="/destinos/busca"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            Buscar por mais locais
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {mockDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
    </div>
  );
}
