export interface Guest {
  id: string;
  name: string;
  confirmed: boolean;
  family: string;
}

export interface Location {
  name: string;
  address: string;
  googleMapsUrl: string;
  lat: number;
  lng: number;
}

export interface EventItinerary {
  id: string;
  time: string;
  event: string;
  description?: string;
}

export interface FamilyData {
  password: string;
  familyName: string;
  guests?: Guest[];
  personalMessage?: string;
}

export interface WeddingData {
  groomName: string;
  brideName: string;
  weddingDate: string;
  church: Location;
  reception: Location;
  itinerary: EventItinerary[];
}