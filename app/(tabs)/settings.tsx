/**
 * @fileoverview Pantalla de configuración
 * 
 * Permite personalizar todos los aspectos de la aplicación:
 * - Preferencias de usuario
 * - Configuración de alertas
 * - Gestión de dispositivos
 * - Información del sistema
 * 
 * @module SettingsScreen
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

/**
 * Pantalla de configuración del sistema
 * 
 * Centraliza todas las opciones de configuración:
 * - Configuración de cuenta
 * - Preferencias de notificaciones
 * - Ajustes de dispositivos
 * - Configuración de idioma
 * 
 * @returns {React.ReactElement} Pantalla de configuración
 */
export default function SettingsScreen() {
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
          title: t.settings,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600' as const,
            color: '#2C3E50',
          },
        }}
      />
      <View style={styles.container}>
        <Text style={styles.text}>{t.settings}</Text>
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
