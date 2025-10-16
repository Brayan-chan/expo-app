/**
 * @fileoverview Pantalla principal (Home)
 * 
 * Muestra información general sobre la colmena activa, incluyendo:
 * - Estado general de la colmena
 * - Condiciones ambientales internas
 * - Alertas y notificaciones
 * - Acceso rápido a funciones principales
 * 
 * @module HomeScreen
 */

import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Thermometer, Droplets, AlertTriangle } from 'lucide-react-native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Stack } from 'expo-router';

/**
 * Pantalla principal de la aplicación
 * 
 * Características:
 * - Header personalizado con logo y selector de idioma
 * - Información del estado de la colmena
 * - Mediciones ambientales en tiempo real
 * - Sistema de alertas y notificaciones
 * 
 * @returns {React.ReactElement} Pantalla principal
 */
export default function HomeScreen() {
  // Hooks para manejo de idiomas
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#B8D4D0',
          },
          headerShadowVisible: false,
          title: '',
          headerLeft: () => (
            <View style={styles.headerLeft}>
              <Image 
                source={require('@/assets/images/favicon.png')}
                style={styles.beeIcon}
              />
              <Text style={styles.headerTitle}>{t.KaabTech}</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={toggleLanguage} style={styles.languageButton}>
              <Text style={styles.languageButtonText}>
                {language === 'es' ? 'ES' : 'MAYA'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.hiveInfoCard}>
          <Text style={styles.hiveInfoText}>
            {t.hiveId}: A002 · {t.status}: {t.healthy}
          </Text>
        </View>

        <View style={styles.environmentCard}>
          <Text style={styles.cardTitle}>{t.internalEnvironment}</Text>

          <View style={styles.temperatureRow}>
            <View style={styles.temperatureLeft}>
              <Thermometer size={28} color="#2C3E50" strokeWidth={2} />
              <Text style={styles.temperatureValue}>35.8°C</Text>
            </View>

            <View style={styles.locationBadge}>
              <MapPin size={24} color="#2C3E50" strokeWidth={2} />
            </View>
          </View>

          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>{t.location}:</Text>
            <Text style={styles.locationValue}>{t.hive} 1</Text>
          </View>

          <View style={styles.humidityRow}>
            <Thermometer size={24} color="#2C3E50" strokeWidth={2} />
            <Text style={styles.humidityValue}>68%</Text>
          </View>

          <View style={styles.humidityLabel}>
            <Droplets size={20} color="#2C3E50" strokeWidth={2} />
            <Text style={styles.humidityText}>{t.humidity}</Text>
          </View>
        </View>

        <View style={styles.pesticideCard}>
          <Text style={styles.pesticideTitle}>{t.pesticideAlert}</Text>

          <View style={styles.pesticideContent}>
            <AlertTriangle size={32} color="#2C3E50" strokeWidth={2} />
            <Text style={styles.pesticideText}>{t.noPesticidesDetected}</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8D4D0',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  beeIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600' as const,
    color: '#2C3E50',
  },
  languageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  languageButtonText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#2C3E50',
  },
  hiveInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  hiveInfoText: {
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '500' as const,
  },
  environmentCard: {
    backgroundColor: '#D1D9D9',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#2C3E50',
    marginBottom: 20,
  },
  temperatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  temperatureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  temperatureValue: {
    fontSize: 48,
    fontWeight: '700' as const,
    color: '#2C3E50',
  },
  locationBadge: {
    backgroundColor: '#FFFFFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationInfo: {
    marginBottom: 24,
  },
  locationLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#2C3E50',
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 14,
    color: '#5A6C6C',
  },
  humidityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  humidityValue: {
    fontSize: 40,
    fontWeight: '700' as const,
    color: '#2C3E50',
  },
  humidityLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  humidityText: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '500' as const,
  },
  pesticideCard: {
    backgroundColor: '#F5EDD1',
    borderRadius: 16,
    padding: 20,
  },
  pesticideTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#2C3E50',
    marginBottom: 16,
  },
  pesticideContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  pesticideText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#2C3E50',
    lineHeight: 22,
  },
});
