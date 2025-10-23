'use client';

import { useState } from 'react';
import { SearchBox } from '@/components/destinos/SearchBox';
import { SearchFilters } from '@/components/destinos/SearchFilters';
import { DestinationCard } from '@/components/destinos/DestinationCard';
import { Place } from '@/types';
import { mockDestinations } from '@/data/mockDestinations';

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<Place[]>(mockDestinations);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    // Implementar chamada à API aqui
    // Por enquanto, apenas filtra os dados mock
    const filtered = mockDestinations.filter(dest => 
      dest.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
    setLoading(false);
  };

  const handleFilterChange = (filters: any) => {
    // Implementar filtros aqui
    const filtered = mockDestinations.filter(dest => {
      if (filters.accessibility && !dest.accessibility.overall.wheelchair) return false;
      if (filters.hasHotels && (dest.hotels ?? []).length === 0) return false;
      if (filters.hasRestaurants && (dest.restaurants ?? []).length === 0) return false;
      if (filters.minRating > 0 && dest.rating.score < filters.minRating) return false;
      return true;
    });
    setSearchResults(filtered);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Encontre seu próximo destino
      </h1>
      
      <div className="mb-8">
        <SearchBox onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <SearchFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="md:col-span-3">
          {loading ? (
            <div className="text-center">Carregando...</div>
          ) : searchResults.length === 0 ? (
            <div className="text-center">Nenhum destino encontrado</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((destination) => (
                <DestinationCard
                  key={destination.id}
                  destination={destination}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
