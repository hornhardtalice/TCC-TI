export interface BaseUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: Date | null;
}

export interface User extends BaseUser {
  profile?: Profile;
  reviews?: Review[];
  favorites?: Favorite[];
  visitedPlaces?: string[];
  chats?: ChatMessage[];
}

export interface Profile {
  id: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  userId: string;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  category: PlaceCategory;
  rating: {
    score: number;
    count: number;
    reviews: Review[];
  };
  price?: number;
  latitude?: number;
  longitude?: number;
  website?: string;
  phone?: string;
  photos?: string[];
  weather?: {
    climate: string;
    bestTimeToVisit: string[];
  };
  localCurrency?: string;
  languages?: string[];
  timeZone?: string;
  accessibility?: {
    overall: {
      wheelchair: boolean;
      visualAids: boolean;
      hearingAids: boolean;
      mobilitySupport: boolean;
      serviceAnimal: boolean;
      description: string;
    };
    publicTransport?: boolean;
    accessibleTaxis?: boolean;
  };
  hotels?: Place[];
  restaurants?: Place[];
  touristSpots?: Place[];
}

export interface Destination extends Place {
  weather: {
    climate: string;
    bestTimeToVisit: string[];
  };
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
  createdAt: Date;
  updatedAt: Date;
  reviews?: Review[];
  favorites?: Favorite[];
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  placeId: string;
  user?: User;
  place?: Place;
  createdAt: Date;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  placeId: string;
  user?: User;
  place?: Place;
  createdAt: Date;
}

export enum PlaceCategory {
  CITY = 'CITY',
  HOTEL = 'HOTEL',
  RESTAURANT = 'RESTAURANT',
  TOURIST_SPOT = 'TOURIST_SPOT',
  MUSEUM = 'MUSEUM',
  PARK = 'PARK',
  BEACH = 'BEACH',
  SHOPPING = 'SHOPPING',
  OTHER = 'OTHER'
}

export interface AccessibilityInfo {
  overall: {
    wheelchair: boolean;
    visualAids: boolean;
    hearingAids: boolean;
    mobilitySupport: boolean;
    serviceAnimal: boolean;
    description: string;
  };
  publicTransport?: boolean;
  accessibleTaxis?: boolean;
}

export interface Weather {
  bestTimeToVisit: string[];
  climate: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  destinationId: string;
  message: string;
  timestamp: string;
  replyTo?: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
