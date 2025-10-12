import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type Language = 'es' | 'maya';

interface Translations {
  home: string;
  sensors: string;
  history: string;
  settings: string;
  apiaryIQ: string;
  hiveId: string;
  status: string;
  healthy: string;
  internalEnvironment: string;
  location: string;
  humidity: string;
  pesticideAlert: string;
  noPesticidesDetected: string;
}

const translations: Record<Language, Translations> = {
  es: {
    home: 'Home',
    sensors: 'Sensors',
    history: 'History',
    settings: 'Settings',
    apiaryIQ: 'Apiary IQ',
    hiveId: 'Hive ID',
    status: 'Status',
    healthy: 'Healthy',
    internalEnvironment: 'Internal Environment',
    location: 'Location',
    humidity: 'Humidity',
    pesticideAlert: 'Pesticide Alert',
    noPesticidesDetected: 'NO PESTICIDES\nDETECTED',
  },
  maya: {
    home: 'Najil',
    sensors: "K'ajóol",
    history: 'Sáamal',
    settings: 'Jats\'uts',
    apiaryIQ: 'Apiary IQ',
    hiveId: "Kaab' ID",
    status: 'Jats\'uts',
    healthy: 'Jats\'uts',
    internalEnvironment: "Ichil K'iin",
    location: "Tu'ux yaan",
    humidity: 'Ja\'il',
    pesticideAlert: "K'áax Xíiw",
    noPesticidesDetected: "MA' YAN K'ÁAX\nXÍIW",
  },
};

const LANGUAGE_STORAGE_KEY = '@apiary_language';

export const [LanguageProvider, useLanguage] = createContextHook(() => {
  const [language, setLanguageState] = useState<Language>('es');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === 'es' || stored === 'maya') {
        setLanguageState(stored);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = useCallback(async (newLanguage: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      setLanguageState(newLanguage);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLanguage: Language = language === 'es' ? 'maya' : 'es';
    setLanguage(newLanguage);
  }, [language, setLanguage]);

  const t = useMemo(() => translations[language], [language]);

  return useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      isLoading,
    }),
    [language, setLanguage, toggleLanguage, t, isLoading]
  );
});
