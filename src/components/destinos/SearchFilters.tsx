'use client';

import { useState } from 'react';

interface FilterOptions {
  accessibility: boolean;
  hasHotels: boolean;
  hasRestaurants: boolean;
  minRating: number;
}

interface SearchFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
}

export function SearchFilters({ onFilterChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    accessibility: false,
    hasHotels: false,
    hasRestaurants: false,
    minRating: 0,
  });

  const handleFilterChange = (key: keyof FilterOptions, value: boolean | number) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>
      
      <div className="space-y-4">
        <div>
          <label className="flex items-center space-x-2" htmlFor="accessibility">
            <input
              id="accessibility"
              type="checkbox"
              checked={filters.accessibility}
              onChange={(e) => handleFilterChange('accessibility', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Acessível para PCD</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2" htmlFor="hasHotels">
            <input
              id="hasHotels"
              type="checkbox"
              checked={filters.hasHotels}
              onChange={(e) => handleFilterChange('hasHotels', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Com hotéis</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2" htmlFor="hasRestaurants">
            <input
              id="hasRestaurants"
              type="checkbox"
              checked={filters.hasRestaurants}
              onChange={(e) => handleFilterChange('hasRestaurants', e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            <span>Com restaurantes</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avaliação mínima
          </label>
          <select
            id="minRating"
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            aria-label="Selecione a avaliação mínima"
          >
            <option value={0}>Todas</option>
            <option value={3}>3+ estrelas</option>
            <option value={4}>4+ estrelas</option>
            <option value={4.5}>4.5+ estrelas</option>
          </select>
        </div>
      </div>
    </div>
  );
}
