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
import { MapPin, Thermometer, Droplets, AlertTriangle, ChevronDown, Search } from 'lucide-react-native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, Modal, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { MOCK_HIVES, Hive } from '@/mocks/hives';
import { useState, useMemo } from 'react';

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
  const [selectedHive, setSelectedHive] = useState<Hive>(MOCK_HIVES[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHives = useMemo(() => {
    if (!searchQuery.trim()) return MOCK_HIVES;
    const query = searchQuery.toLowerCase();
    return MOCK_HIVES.filter(
      (hive) =>
        hive.name.toLowerCase().includes(query) ||
        hive.id.toLowerCase().includes(query) ||
        hive.location.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#1a1e4bff',
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
        <TouchableOpacity
          style={styles.hiveSelector}
          onPress={() => setIsModalVisible(true)}
          activeOpacity={0.7}
        >
          <View style={styles.hiveSelectorContent}>
            <View>
              <Text style={styles.hiveSelectorLabel}>{t.hiveId}</Text>
              <Text style={styles.hiveSelectorValue}>
                {selectedHive.id} · {selectedHive.status === 'healthy' ? t.healthy : t.alert}
              </Text>
            </View>
            <ChevronDown size={24} color="#2C3E50" strokeWidth={2} />
          </View>
        </TouchableOpacity>
        
        <View style={[styles.pesticideCard, selectedHive.pesticidesDetected && styles.pesticideCardAlert]}>
          <Text style={styles.pesticideTitle}>{t.pesticideAlert}</Text>

          <View style={styles.pesticideContent}>
            <AlertTriangle size={32} color="#2C3E50" strokeWidth={2} />
            <Text style={styles.pesticideText}>
              {selectedHive.pesticidesDetected ? t.pesticidesDetected : t.noPesticidesDetected}
            </Text>
          </View>
        </View>

        <View style={styles.environmentCard}>
          <Text style={styles.cardTitle}>{t.internalTemperature}</Text>

          <View style={styles.temperatureRow}>
            <View style={styles.temperatureLeft}>
              <Thermometer size={28} color="#2C3E50" strokeWidth={2} />
              <Text style={styles.temperatureValue}>{selectedHive.internalTemp}°C</Text>
            </View>

            <View style={styles.locationBadge}>
              <MapPin size={24} color="#2C3E50" strokeWidth={2} />
            </View>
          </View>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>{t.location}:</Text>
            <Text style={styles.locationValue}>{selectedHive.location}</Text>
          </View>

          <View style={styles.humidityRow}>
            <Droplets size={24} color="#2C3E50" strokeWidth={2} />
            <Text style={styles.humidityValue}>{selectedHive.internalHumidity}%</Text>
          </View>

          <View style={styles.humidityLabel}>
            <Text style={styles.humidityText}>{t.humidity}</Text>
          </View>
        </View>
        <View style={styles.environmentCard}>
          <Text style={styles.cardTitle}>{t.externalTemperature}</Text>

          <View style={styles.temperatureRow}>
            <View style={styles.temperatureLeft}>
              <Thermometer size={28} color="#2C3E50" strokeWidth={2} />
              <Text style={styles.temperatureValue}>{selectedHive.externalTemp}°C</Text>
            </View>
          </View>

          <View style={styles.humidityRow}>
            <Droplets size={24} color="#2C3E50" strokeWidth={2} />
            <Text style={styles.humidityValue}>{selectedHive.externalHumidity}%</Text>
          </View>
           <View style={styles.humidityLabel}>
            <Text style={styles.humidityText}>{t.humidity}</Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType='slide'
        presentationStyle='pageSheet'
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t.selectHive}</Text>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalCloseButton}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <Search size={20} color="#5A6C6C" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder={t.searchHive}
              placeholderTextColor="#5A6C6C"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <FlatList
            data={filteredHives}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.hiveList}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.hiveItem,
                  selectedHive.id === item.id && styles.hiveItemSelected,
                ]}
                onPress={() => {
                  setSelectedHive(item);
                  setIsModalVisible(false);
                  setSearchQuery('');
                }}
              >
                <View style={styles.hiveItemContent}>
                  <Text style={styles.hiveItemName}>{item.name}</Text>
                  <Text style={styles.hiveItemDetails}>
                    {t.hiveId}: {item.id} · {item.status === 'healthy' ? t.healthy : t.alert}
                  </Text>
                </View>
                {selectedHive.id === item.id && (
                  <View style={styles.checkmark}>
                    <Text style={styles.checkmarkText}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1e4bff',
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
    color: '#F7D116',
  },
  languageButton: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
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
  hiveSelector: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  hiveSelectorContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hiveSelectorLabel: {
    fontSize: 12,
    color: '#5A6C6C',
    fontWeight: '500' as const,
    marginBottom: 4,
  },
  hiveSelectorValue: {
    fontSize: 16,
    color: '#2C3E50',
    fontWeight: '600' as const,
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
    marginBottom: 16,
  },
   pesticideCardAlert: {
    backgroundColor: '#FFD6D6',
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#B8D4D0',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#B8D4D0',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#2C3E50',
  },
  modalCloseButton: {
    fontSize: 28,
    color: '#2C3E50',
    fontWeight: '300' as const,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  hiveList: {
    padding: 20,
    paddingTop: 0,
  },
  hiveItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hiveItemSelected: {
    backgroundColor: '#D1E7E3',
  },
  hiveItemContent: {
    flex: 1,
  },
  hiveItemName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#2C3E50',
    marginBottom: 4,
  },
  hiveItemDetails: {
    fontSize: 14,
    color: '#5A6C6C',
    fontWeight: '500' as const,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#4A9B8E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700' as const,
  },
});
