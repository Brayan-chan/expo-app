/**
 * @fileoverview Contexto para el manejo de idiomas en la aplicación
 * 
 * Este archivo implementa el sistema de internacionalización (i18n) de la aplicación,
 * permitiendo cambiar entre español y maya. Utiliza AsyncStorage para persistir
 * la preferencia de idioma del usuario.
 */

import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type Language = 'es' | 'maya';

interface Translations {
  home: string;
  sensors: string;
  history: string;
  settings: string;
  KaabTech: string;
  hive: string;
  hiveId: string;
  status: string;
  healthy: string;
  internalTemperature: string;
  location: string;
  humidity: string;
  pesticideAlert: string;
  noPesticidesDetected: string;
}

const translations: Record<Language, Translations> = {
  es: {
    home: 'Inicio',
    sensors: 'Sensores',
    history: 'Historial',
    settings: 'Ajustes',
    KaabTech: 'Kaab Tech',
    hive: 'Colmena',
    hiveId: 'ID Colmena',
    status: 'Estado',
    healthy: 'Saludable',
    internalTemperature: 'Temperatura Interna',
    location: 'Ubicación',
    humidity: 'Humedad',
    pesticideAlert: 'Alerta de Pesticidas',
    noPesticidesDetected: 'NO SE DETECTARON\nPESTICIDAS',
  },
  maya: {
    home: 'Káajal',
    sensors: "K'ajóol",
    history: 'Sáamal',
    settings: 'Jats\'uts',
    KaabTech: 'Kaab Tech',
    hive: 'Kaab',
    hiveId: "Kaab' ID",
    status: 'Jats\'uts',
    healthy: 'Jats\'uts',
    internalTemperature: "k’i’ik’el ichil",
    location: "Tu'ux yaan",
    humidity: 'Ja\'il',
    pesticideAlert: "K'áax Xíiw",
    noPesticidesDetected: "MA' YAN K'ÁAX\nXÍIW",
  },
};

const LANGUAGE_STORAGE_KEY = '@kaab_tech_language';

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
