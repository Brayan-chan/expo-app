/**
 * @fileoverview Layout de las pestañas de navegación
 * 
 * Este archivo configura la navegación por pestañas de la aplicación, incluyendo:
 * - Diseño y estilos de la barra de pestañas
 * - Iconos y etiquetas de las pestañas
 * - Configuración de cada pantalla de pestaña
 * 
 * @module TabLayout
 */

import { Tabs } from 'expo-router';
import { Home, Calendar, Settings } from 'lucide-react-native';
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Componente de navegación por pestañas
 * 
 * Configura la navegación inferior de la aplicación con:
 * - Home: Pantalla principal
 * - Sensors: Monitor de sensores
 * - History: Historial de lecturas
 * - Settings: Configuración de la aplicación
 * 
 * @returns {React.ReactElement} Navegación por pestañas
 */
export default function TabLayout() {
  // Hook para traducción de textos
  const { t } = useLanguage();

  return (
    <Tabs
      screenOptions={{
        // Oculta el header por defecto para cada pestaña
        headerShown: false,
        // Colores para estados activo/inactivo de las pestañas
        tabBarActiveTintColor: '#2C3E50',
        tabBarInactiveTintColor: '#8A9A9A',
        // Estilos de la barra de pestañas
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
        // Estilos de las etiquetas de las pestañas
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500' as const,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t.home,
          tabBarLabel: t.home,
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: t.history,
          tabBarLabel: t.history,
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} strokeWidth={2} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.settings,
          tabBarLabel: t.settings,
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} strokeWidth={2} />,
        }}
      />
    </Tabs>
  );
}
