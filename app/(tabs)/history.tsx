import { useLanguage } from '@/contexts/LanguageContext';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, TextInput, FlatList, Dimensions, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { useState, useMemo } from 'react';
import { MOCK_HIVES, Hive } from '@/mocks/hives';
import { MOCK_WEEKLY_STATS } from '@/mocks/weeklyHistory';
import { ChevronDown, Search, Calendar, Thermometer, Droplets } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';

type TabType = 'temperature' | 'humidity';

export default function HistoryScreen() {
  const { t, language, toggleLanguage } = useLanguage();
  const [selectedHive, setSelectedHive] = useState<Hive>(MOCK_HIVES[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('temperature');

  const weeklyStats = useMemo(() => {
    return MOCK_WEEKLY_STATS.find(stats => stats.hiveId === selectedHive.id)!;
  }, [selectedHive.id]);

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

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 64;

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
                style={styles.headerBeeIcon}
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
          <View style={styles.beeIconContainer}>
            <Text style={styles.beeIcon}>🐝</Text>
          </View>
          <View style={styles.hiveSelectorTextContainer}>
            <Text style={styles.hiveSelectorLabel}>{t.hiveId}</Text>
            <View style={styles.hiveSelectorBottomRow}>
              <Text style={styles.hiveSelectorValue}>{selectedHive.id}</Text>
              <ChevronDown size={20} color="#2C3E50" strokeWidth={2} />
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>{t.status}:</Text>
          <Text style={[styles.statusValue, selectedHive.status === 'healthy' && styles.statusHealthy]}>
            {selectedHive.status === 'healthy' ? t.healthy : t.alert}
          </Text>
        </View>

        <View style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <View style={styles.historyTitleContainer}>
              <Calendar size={20} color="#2C3E50" strokeWidth={2} />
              <Text style={styles.historyTitle}>{t.weeklyHistory}</Text>
            </View>
            <Text style={styles.dateText}>16/10/2025</Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'temperature' && styles.tabActive]}
              onPress={() => setActiveTab('temperature')}
              activeOpacity={0.7}
            >
              <Thermometer
                size={18}
                color={activeTab === 'temperature' ? '#4A9B8E' : '#5A6C6C'}
                strokeWidth={2}
              />
              <Text style={[styles.tabText, activeTab === 'temperature' && styles.tabTextActive]}>
                {t.temperature}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'humidity' && styles.tabActive]}
              onPress={() => setActiveTab('humidity')}
              activeOpacity={0.7}
            >
              <Droplets
                size={18}
                color={activeTab === 'humidity' ? '#4A9B8E' : '#5A6C6C'}
                strokeWidth={2}
              />
              <Text style={[styles.tabText, activeTab === 'humidity' && styles.tabTextActive]}>
                {t.humidity}
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'temperature' ? (
            <>
              <Text style={styles.chartTitle}>{t.tempVariation}</Text>
              {Platform.OS !== 'web' ? (
                <View style={styles.chartContainer}>
                  <LineChart
                    data={{
                      labels: weeklyStats.weekData.map(d => d.dayShort),
                      datasets: [
                        {
                          data: weeklyStats.weekData.map(d => d.internalTemp),
                          color: () => '#FF8C42',
                          strokeWidth: 2,
                        },
                        {
                          data: weeklyStats.weekData.map(d => d.externalTemp),
                          color: () => '#4A7C9E',
                          strokeWidth: 2,
                        },
                      ],
                      legend: [t.internal, t.external],
                    }}
                    width={chartWidth}
                    height={240}
                    chartConfig={{
                      backgroundColor: '#FFFFFF',
                      backgroundGradientFrom: '#FFFFFF',
                      backgroundGradientTo: '#FFFFFF',
                      decimalPlaces: 1,
                      color: (opacity = 1) => `rgba(90, 108, 108, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(90, 108, 108, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                      },
                      propsForBackgroundLines: {
                        strokeDasharray: '',
                        stroke: '#D1D9D9',
                        strokeWidth: 1,
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                    }}
                  />
                </View>
              ) : (
                <View style={styles.webChartContainer}>
                  <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: '#FF8C42' }]} />
                      <Text style={styles.legendText}>{t.internal}</Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: '#4A7C9E' }]} />
                      <Text style={styles.legendText}>{t.external}</Text>
                    </View>
                  </View>
                  <View style={styles.webChartDataContainer}>
                    {weeklyStats.weekData.map((day, index) => (
                      <View key={index} style={styles.webChartDay}>
                        <View style={styles.webChartBars}>
                          <View style={styles.webChartBar}>
                            <View
                              style={[
                                styles.webChartBarFill,
                                {
                                  backgroundColor: '#FF8C42',
                                  height: `${(day.internalTemp / 40) * 100}%`,
                                },
                              ]}
                            />
                            <Text style={styles.webChartValue}>{day.internalTemp}°</Text>
                          </View>
                          <View style={styles.webChartBar}>
                            <View
                              style={[
                                styles.webChartBarFill,
                                {
                                  backgroundColor: '#4A7C9E',
                                  height: `${(day.externalTemp / 40) * 100}%`,
                                },
                              ]}
                            />
                            <Text style={styles.webChartValue}>{day.externalTemp}°</Text>
                          </View>
                        </View>
                        <Text style={styles.webChartLabel}>{day.dayShort}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.statsSection}>
                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <Thermometer size={20} color="#2C3E50" strokeWidth={2} />
                    <Text style={styles.statTitle}>{t.internalTemp}</Text>
                  </View>
                  <View style={styles.statValues}>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.min}</Text>
                      <Text style={[styles.statValueNumber, { color: '#4A7C9E' }]}>
                        {weeklyStats.tempStats.internal.min}°C
                      </Text>
                    </View>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.avg}</Text>
                      <Text style={[styles.statValueNumber, { color: '#4A9B8E' }]}>
                        {weeklyStats.tempStats.internal.avg}°C
                      </Text>
                    </View>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.max}</Text>
                      <Text style={[styles.statValueNumber, { color: '#E74C3C' }]}>
                        {weeklyStats.tempStats.internal.max}°C
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <Thermometer size={20} color="#2C3E50" strokeWidth={2} />
                    <Text style={styles.statTitle}>{t.externalTemp}</Text>
                  </View>
                  <View style={styles.statValues}>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.min}</Text>
                      <Text style={[styles.statValueNumber, { color: '#4A7C9E' }]}>
                        {weeklyStats.tempStats.external.min}°C
                      </Text>
                    </View>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.avg}</Text>
                      <Text style={[styles.statValueNumber, { color: '#4A9B8E' }]}>
                        {weeklyStats.tempStats.external.avg}°C
                      </Text>
                    </View>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.max}</Text>
                      <Text style={[styles.statValueNumber, { color: '#E74C3C' }]}>
                        {weeklyStats.tempStats.external.max}°C
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.chartTitle}>{t.humidityVariation}</Text>
              {Platform.OS !== 'web' ? (
                <View style={styles.chartContainer}>
                  <LineChart
                    data={{
                      labels: weeklyStats.weekData.map(d => d.dayShort),
                      datasets: [
                        {
                          data: weeklyStats.weekData.map(d => d.internalHumidity),
                          color: () => '#5DADE2',
                          strokeWidth: 2,
                        },
                        {
                          data: weeklyStats.weekData.map(d => d.externalHumidity),
                          color: () => '#3498DB',
                          strokeWidth: 2,
                        },
                      ],
                      legend: [t.internal, t.external],
                    }}
                    width={chartWidth}
                    height={240}
                    chartConfig={{
                      backgroundColor: '#FFFFFF',
                      backgroundGradientFrom: '#FFFFFF',
                      backgroundGradientTo: '#FFFFFF',
                      decimalPlaces: 1,
                      color: (opacity = 1) => `rgba(90, 108, 108, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(90, 108, 108, ${opacity})`,
                      style: {
                        borderRadius: 16,
                      },
                      propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                      },
                      propsForBackgroundLines: {
                        strokeDasharray: '',
                        stroke: '#D1D9D9',
                        strokeWidth: 1,
                      },
                    }}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16,
                    }}
                  />
                </View>
              ) : (
                <View style={styles.webChartContainer}>
                  <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: '#5DADE2' }]} />
                      <Text style={styles.legendText}>{t.internal}</Text>
                    </View>
                    <View style={styles.legendItem}>
                      <View style={[styles.legendDot, { backgroundColor: '#3498DB' }]} />
                      <Text style={styles.legendText}>{t.external}</Text>
                    </View>
                  </View>
                  <View style={styles.webChartDataContainer}>
                    {weeklyStats.weekData.map((day, index) => (
                      <View key={index} style={styles.webChartDay}>
                        <View style={styles.webChartBars}>
                          <View style={styles.webChartBar}>
                            <View
                              style={[
                                styles.webChartBarFill,
                                {
                                  backgroundColor: '#5DADE2',
                                  height: `${day.internalHumidity}%`,
                                },
                              ]}
                            />
                            <Text style={styles.webChartValue}>{day.internalHumidity}%</Text>
                          </View>
                          <View style={styles.webChartBar}>
                            <View
                              style={[
                                styles.webChartBarFill,
                                {
                                  backgroundColor: '#3498DB',
                                  height: `${day.externalHumidity}%`,
                                },
                              ]}
                            />
                            <Text style={styles.webChartValue}>{day.externalHumidity}%</Text>
                          </View>
                        </View>
                        <Text style={styles.webChartLabel}>{day.dayShort}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.statsSection}>
                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <Droplets size={20} color="#2C3E50" strokeWidth={2} />
                    <Text style={styles.statTitle}>{t.internalHumidity}</Text>
                  </View>
                  <View style={styles.statValues}>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.min}</Text>
                      <Text style={[styles.statValueNumber, { color: '#E67E22' }]}>
                        {weeklyStats.humidityStats.internal.min}%
                      </Text>
                    </View>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.avg}</Text>
                      <Text style={[styles.statValueNumber, { color: '#4A9B8E' }]}>
                        {weeklyStats.humidityStats.internal.avg}%
                      </Text>
                    </View>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.max}</Text>
                      <Text style={[styles.statValueNumber, { color: '#3498DB' }]}>
                        {weeklyStats.humidityStats.internal.max}%
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.statCard}>
                  <View style={styles.statHeader}>
                    <Droplets size={20} color="#2C3E50" strokeWidth={2} />
                    <Text style={styles.statTitle}>{t.externalHumidity}</Text>
                  </View>
                  <View style={styles.statValues}>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.min}</Text>
                      <Text style={[styles.statValueNumber, { color: '#E67E22' }]}>
                        {weeklyStats.humidityStats.external.min}%
                      </Text>
                    </View>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.avg}</Text>
                      <Text style={[styles.statValueNumber, { color: '#4A9B8E' }]}>
                        {weeklyStats.humidityStats.external.avg}%
                      </Text>
                    </View>
                    <View style={styles.statValueItem}>
                      <Text style={styles.statValueLabel}>{t.max}</Text>
                      <Text style={[styles.statValueNumber, { color: '#3498DB' }]}>
                        {weeklyStats.humidityStats.external.max}%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={isModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBeeIcon: {
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
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  hiveSelector: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  beeIconContainer: {
    backgroundColor: '#F5EDD1',
    width: 56,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  beeIcon: {
    fontSize: 32,
  },
  hiveSelectorTextContainer: {
    flex: 1,
  },
  hiveSelectorLabel: {
    fontSize: 14,
    color: '#5A6C6C',
    fontWeight: '500' as const,
    marginBottom: 4,
  },
  hiveSelectorBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  hiveSelectorValue: {
    fontSize: 20,
    color: '#2C3E50',
    fontWeight: '700' as const,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 14,
    color: '#ffffffff',
    fontWeight: '500' as const,
  },
  statusValue: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '700' as const,
  },
  statusHealthy: {
    color: '#4A9B8E',
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#2C3E50',
  },
  dateText: {
    fontSize: 14,
    color: '#5A6C6C',
    fontWeight: '500' as const,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: 14,
    color: '#5A6C6C',
    fontWeight: '600' as const,
  },
  tabTextActive: {
    color: '#4A9B8E',
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#2C3E50',
    marginBottom: 12,
  },
  chartContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  statsSection: {
    gap: 12,
  },
  statCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#2C3E50',
  },
  statValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statValueItem: {
    alignItems: 'center',
  },
  statValueLabel: {
    fontSize: 12,
    color: '#5A6C6C',
    fontWeight: '500' as const,
    marginBottom: 4,
  },
  statValueNumber: {
    fontSize: 18,
    fontWeight: '700' as const,
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
  webChartContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#5A6C6C',
    fontWeight: '600' as const,
  },
  webChartDataContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 200,
    paddingHorizontal: 8,
  },
  webChartDay: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  webChartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 160,
  },
  webChartBar: {
    width: 16,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  webChartBarFill: {
    width: '100%',
    borderRadius: 4,
    minHeight: 20,
  },
  webChartValue: {
    fontSize: 10,
    color: '#5A6C6C',
    fontWeight: '600' as const,
    marginTop: 4,
  },
  webChartLabel: {
    fontSize: 12,
    color: '#5A6C6C',
    fontWeight: '600' as const,
  },
});
