export type Language = 'es' | 'en';

export interface TranslationParams {
  [key: string]: string | number;
}

export interface Translations {
  common: {
    loading: string;
    logout: string;
    previous: string;
    next: string;
    backToStart: string;
    confirm: string;
  };
  login: {
    title: string;
    accessCodeLabel: string;
    accessCodePlaceholder: string;
    submitButton: string;
    verifying: string;
    errorMessage: string;
    helpText: string;
  };
  cover: {
    announcement: string;
    weddingDate: string;
    viewDetailsButton: string;
  };
  location: {
    ceremonyTitle: string;
    receptionTitle: string;
    loadingMap: string;
  };
  itinerary: {
    title: string;
    ceremony: string;
    ceremonyLocation: string;
    cocktail: string;
    cocktailLocation: string;
    dinner: string;
    dinnerLocation: string;
    dance: string;
    danceDescription: string;
  };
  notes: {
    title: string;
    dressCodeTitle: string;
    dressCodeDescription: string;
    forbiddenColors: string;
    white: string;
    beige: string;
    green: string;
    childrenTitle: string;
    childrenDescription: string;
    punctualityTitle: string;
    punctualityDescription: string;
    surprisesTitle: string;
    surprisesDescription: string;
  };
  gifts: {
    title: string;
    description: string;
    button: string;
  };
  video: {
    unsupported: string;
  };
  guestList: {
    title: string;
    description: string;
    whatsappButton: string;
    whatsappTemplate: string;
    importantNote: string;
    importantText: string;
  };
}

export type TranslationKey = keyof Translations;
export type NestedTranslationKey<T extends TranslationKey> = keyof Translations[T];
