import { DestinationType } from '@/types/destination';
import { Hotel, Restaurant, TouristSpot } from '@/types/places';
import { PlaceCategory } from '@/types';

const baseAccessibility = {
  overall: {
    wheelchair: true,
    visualAids: true,
    hearingAids: true,
    mobilitySupport: true,
    serviceAnimal: true,
    description: 'Adaptações completas disponíveis'
  },
  publicTransport: true,
  accessibleTaxis: true
};

export const mockDestinations: DestinationType[] = [
  {
    id: '1',
    name: 'Rio de Janeiro',
    description: 'Cidade maravilhosa com praias e montanhas',
    imageUrl: '/images/rio/cristo.jpg',
    photos: ['/images/rio/copacabana.jpg', '/images/rio/cristo.jpg', '/images/rio/pao-de-acucar.jpg'],
  category: PlaceCategory.CITY,
    location: {
      city: 'Rio de Janeiro',
      state: 'Rio de Janeiro',
      country: 'Brasil'
    },
    rating: {
      score: 4.5,
      count: 1250,
      reviews: []
    },
    accessibility: baseAccessibility,
    weather: {
      climate: 'Tropical',
      bestTimeToVisit: ['Março', 'Abril', 'Maio', 'Setembro', 'Outubro', 'Novembro']
    },
    localCurrency: 'BRL',
    languages: ['Português', 'Inglês', 'Espanhol'],
    timeZone: 'America/Sao_Paulo',
    hotels: [
      {
        id: 'h1',
        name: 'Copacabana Palace',
        description: 'Hotel histórico 5 estrelas em Copacabana',
        imageUrl: '/images/hotels/copacabana-palace.jpg',
        photos: ['/images/hotels/copacabana-palace.jpg'],
  category: PlaceCategory.HOTEL,
        location: {
          city: 'Rio de Janeiro',
          state: 'Rio de Janeiro',
          country: 'Brasil'
        },
        accessibility: baseAccessibility,
        rating: {
          score: 4.8,
          count: 520,
          reviews: []
        },
        stars: 5,
        priceRange: {
          min: 1000,
          max: 5000,
          currency: 'BRL'
        }
      }
    ],
    restaurants: [
      {
        id: 'r1',
        name: 'Confeitaria Colombo',
        description: 'Restaurante histórico com arquitetura art nouveau',
        imageUrl: '/images/restaurants/confeitaria-colombo.jpg',
        photos: ['/images/restaurants/confeitaria-colombo.jpg'],
  category: PlaceCategory.RESTAURANT,
        location: {
          city: 'Rio de Janeiro',
          state: 'Rio de Janeiro',
          country: 'Brasil'
        },
        accessibility: baseAccessibility,
        rating: {
          score: 4.6,
          count: 890,
          reviews: []
        },
        cuisine: ['Brasileira', 'Portuguesa', 'Café'],
        priceRange: {
          min: 50,
          max: 200,
          currency: 'BRL'
        }
      }
    ],
    touristSpots: [
      {
        id: 't1',
        name: 'Cristo Redentor',
        description: 'Estátua Art Déco de Jesus Cristo no topo do Corcovado',
        imageUrl: '/images/tourist-spots/cristo.jpg',
        photos: ['/images/tourist-spots/cristo.jpg'],
  category: PlaceCategory.TOURIST_SPOT,
        location: {
          city: 'Rio de Janeiro',
          state: 'Rio de Janeiro',
          country: 'Brasil'
        },
        accessibility: baseAccessibility,
        rating: {
          score: 4.8,
          count: 3500,
          reviews: []
        },
        suggestedDuration: '2-3 horas'
      }
    ]
  }
];
