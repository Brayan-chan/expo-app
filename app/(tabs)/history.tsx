/**
 * @fileoverview Pantalla de historial
 * 
 * Visualiza el historial de lecturas y eventos de la colmena:
 * - Gráficos históricos
 * - Registros de alertas
 * - Tendencias temporales
 * - Exportación de datos
 * 
 * @module HistoryScreen
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

/**
 * Pantalla de historial y análisis
 * 
 * Proporciona acceso al historial completo de la colmena:
 * - Visualización de datos históricos
 * - Filtros temporales
 * - Análisis de tendencias
 * - Exportación de reportes
 * 
 * @returns {React.ReactElement} Pantalla de historial
 */
export default function HistoryScreen() {
  // Hook para traducción de textos
  const { t } = useLanguage();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#B8D4D0',
          },
          headerShadowVisible: false,
          title: t.history,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600' as const,
            color: '#2C3E50',
          },
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>{t.history}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8D4D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: '500' as const,
  },
});
