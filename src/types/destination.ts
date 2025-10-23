import { Place } from './index';
import { Hotel, Restaurant, TouristSpot } from './places';

export interface DestinationType extends Place {
  accessibility: {
    overall: {
      wheelchair: boolean;
      visualAids: boolean;
      hearingAids: boolean;
      mobilitySupport: boolean;
      serviceAnimal: boolean;
      description: string;
    };
    publicTransport: boolean;
    accessibleTaxis: boolean;
  };
  weather: {
    climate: string;
    bestTimeToVisit: string[];
  };
  touristSpots: TouristSpot[];
  hotels: Hotel[];
  restaurants: Restaurant[];
  languages: string[];
  localCurrency: string;
  timeZone: string;
}
