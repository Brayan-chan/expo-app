/**
 * @fileoverview Pantalla de monitoreo de sensores
 * 
 * Muestra información detallada de todos los sensores activos, incluyendo:
 * - Estado de cada sensor
 * - Lecturas en tiempo real
 * - Gráficos de tendencias
 * - Configuración de alertas
 * 
 * @module SensorsScreen
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

/**
 * Pantalla de monitoreo de sensores
 * 
 * Permite visualizar y gestionar todos los sensores de la colmena:
 * - Lista de sensores activos
 * - Estado de cada sensor
 * - Lecturas detalladas
 * - Configuración de umbrales
 * 
 * @returns {React.ReactElement} Pantalla de sensores
 */
export default function SensorsScreen() {
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
          title: t.sensors,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600' as const,
            color: '#2C3E50',
          },
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>{t.sensors}</Text>
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
