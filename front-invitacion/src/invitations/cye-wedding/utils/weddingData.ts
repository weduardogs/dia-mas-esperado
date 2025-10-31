import { WeddingData } from '../../../types';

export const cyeWeddingConfig = {
  mobileOnly: true // Set to false to allow desktop access
};

export const weddingData: WeddingData = {
  groomName: "Eduardo",
  brideName: "Cecilia", 
  weddingDate: "14 de Febrero, 2025",
  church: {
    name: "Parroquia de Nuestra Señora de las Nieves",
    address: "Calle José María Morelos 138, Loma Bonita, 57940 Cdad. Nezahualcóyotl, Méx.",
    googleMapsUrl: "https://maps.app.goo.gl/yHt9nykoz1uCH9UXA",
    lat: 19.372807,
    lng: -98.988184
  },
  reception: {
    name: "La Cava By Eventos Premier GHR",
    address: "Presa del Sordo 5, Valle de los Pinos, 56420 Los Reyes Acaquilpan, Méx.",
    googleMapsUrl: "https://maps.app.goo.gl/bsFsJ7F8wmnTftgQ8",
    lat: 19.360520,
    lng: -98.986069
  },
  itinerary: [
    {
      id: "1",
      time: "16:00",
      event: "Ceremonia Religiosa",
      description: "Iglesia San José"
    },
    {
      id: "2", 
      time: "18:00",
      event: "Cocktail de Bienvenida",
      description: "Salón Los Jardines"
    },
    {
      id: "3",
      time: "19:30",
      event: "Cena",
      description: "Salón Los Jardines"
    },
    {
      id: "4",
      time: "21:00",
      event: "Baile y Celebración",
      description: "¡Hasta que el cuerpo aguante!"
    }
  ]
};