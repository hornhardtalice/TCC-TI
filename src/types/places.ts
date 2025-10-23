import { Place } from './index';

export interface Hotel extends Place {
  stars: number;
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  amenities?: string[];
}

export interface Restaurant extends Place {
  cuisine: string[];
  priceRange: {
    min: number;
    max: number;
    currency: string;
  };
  menu?: string;
}

export interface TouristSpot extends Place {
  suggestedDuration: string;
  bestTimeToVisit?: string[];
  ticketPrice?: {
    adult: number;
    child: number;
    currency: string;
  };
}
