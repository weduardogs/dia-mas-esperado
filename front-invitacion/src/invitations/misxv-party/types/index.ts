export interface XvPartyData {
  celebrantName: string;
  date: string;
  venue: {
    name: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  theme: string;
  dressCode?: string;
}

export interface XvGuest {
  id: string;
  name: string;
  confirmed: boolean;
  companions?: number;
}

export interface XvPartyConfig {
  partyData: XvPartyData;
  guests: XvGuest[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}