'use client';

import { useState } from 'react';
import { SearchBox } from '@/components/destinos/SearchBox';
import { SearchFilters } from '@/components/destinos/SearchFilters';
import { DestinationCard } from '@/components/destinos/DestinationCard';
import { Destination } from '@/types';

interface SearchResponse {
  places: Destination[];
  pagination: {
    total: number;
    pages: number;
    currentPage: number;
    limit: number;
  };
}

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    query: '',
    page: 1,
    limit: 10,
    accessibility: false,
    hasHotels: false,
    hasRestaurants: false,
    minRating: 0
  });

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchParams(prev => ({ ...prev, query, page: 1 }));
    
    try {
      const queryParams = new URLSearchParams({
        query,
        page: '1',
        limit: '10',
        accessibility: searchParams.accessibility.toString(),
        hasHotels: searchParams.hasHotels.toString(),
        hasRestaurants: searchParams.hasRestaurants.toString(),
        minRating: searchParams.minRating.toString()
      });

      const response = await fetch(`/api/destinations/search?${queryParams}`);
      const data: SearchResponse = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Erro ao buscar destinos:', error);
    } finally {
      setLoading(false);
    }
    setSearchResults(filtered);
    setLoading(false);
  };

  const handleFilterChange = (filters: {
    accessibility: boolean;
    hasHotels: boolean;
    hasRestaurants: boolean;
    minRating: number;
  }) => {
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
            <div className="text-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4 mx-auto"></div>
              <p className="text-gray-600">Buscando destinos...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center p-8">
              <p className="text-xl text-gray-600 mb-4">Nenhum destino encontrado</p>
              <p className="text-gray-500">Tente ajustar os filtros ou fazer uma nova busca</p>
            </div>
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
