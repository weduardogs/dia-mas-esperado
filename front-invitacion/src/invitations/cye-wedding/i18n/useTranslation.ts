import { useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from './translations';
import { TranslationParams, TranslationKey, NestedTranslationKey } from './types';

export const useTranslation = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }

  const { language, changeLanguage } = context;

  // Helper function to interpolate parameters in translation strings
  const interpolate = (text: string, params?: TranslationParams): string => {
    if (!params) return text;

    return Object.keys(params).reduce((result, key) => {
      return result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(params[key]));
    }, text);
  };

  // Translation function with support for nested keys
  const t = <K extends TranslationKey>(
    section: K,
    key: NestedTranslationKey<K>,
    params?: TranslationParams
  ): string => {
    const translation = translations[language][section][key as keyof typeof translations[typeof language][K]];
    return interpolate(String(translation), params);
  };

  return {
    t,
    language,
    changeLanguage,
  };
};
