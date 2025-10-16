export interface WeeklyData {
  day: string;
  dayShort: string;
  internalTemp: number;
  externalTemp: number;
  internalHumidity: number;
  externalHumidity: number;
}

export interface WeeklyStats {
  hiveId: string;
  weekData: WeeklyData[];
  tempStats: {
    internal: { min: number; avg: number; max: number };
    external: { min: number; avg: number; max: number };
  };
  humidityStats: {
    internal: { min: number; avg: number; max: number };
    external: { min: number; avg: number; max: number };
  };
}

function generateWeeklyData(
  baseInternalTemp: number,
  baseExternalTemp: number,
  baseInternalHumidity: number,
  baseExternalHumidity: number,
  seed: number
): WeeklyData[] {
  const days = [
    { day: 'Lunes', dayShort: 'Lun' },
    { day: 'Martes', dayShort: 'Mar' },
    { day: 'Miércoles', dayShort: 'Mié' },
    { day: 'Jueves', dayShort: 'Jue' },
    { day: 'Viernes', dayShort: 'Vie' },
    { day: 'Sábado', dayShort: 'Sáb' },
    { day: 'Domingo', dayShort: 'Dom' },
  ];

  return days.map((day, index) => {
    const dayOffset = (index + seed) * 0.7;
    const tempVariation = Math.sin(dayOffset) * 2 + (Math.cos(dayOffset * 1.3) * 1.5);
    const humidityVariation = Math.cos(dayOffset * 0.8) * 8 + (Math.sin(dayOffset * 1.1) * 3);
    
    return {
      ...day,
      internalTemp: +(baseInternalTemp + tempVariation).toFixed(1),
      externalTemp: +(baseExternalTemp + tempVariation * 1.4 + Math.sin(dayOffset * 2) * 1.2).toFixed(1),
      internalHumidity: Math.round(baseInternalHumidity + humidityVariation),
      externalHumidity: Math.round(baseExternalHumidity + humidityVariation * 0.8 + Math.cos(dayOffset * 1.5) * 4),
    };
  });
}

function calculateStats(weekData: WeeklyData[]) {
  const internalTemps = weekData.map((d) => d.internalTemp);
  const externalTemps = weekData.map((d) => d.externalTemp);
  const internalHums = weekData.map((d) => d.internalHumidity);
  const externalHums = weekData.map((d) => d.externalHumidity);

  return {
    tempStats: {
      internal: {
        min: +Math.min(...internalTemps).toFixed(1),
        avg: +(internalTemps.reduce((a, b) => a + b, 0) / internalTemps.length).toFixed(1),
        max: +Math.max(...internalTemps).toFixed(1),
      },
      external: {
        min: +Math.min(...externalTemps).toFixed(1),
        avg: +(externalTemps.reduce((a, b) => a + b, 0) / externalTemps.length).toFixed(1),
        max: +Math.max(...externalTemps).toFixed(1),
      },
    },
    humidityStats: {
      internal: {
        min: Math.min(...internalHums),
        avg: Math.round(internalHums.reduce((a, b) => a + b, 0) / internalHums.length),
        max: Math.max(...internalHums),
      },
      external: {
        min: Math.min(...externalHums),
        avg: Math.round(externalHums.reduce((a, b) => a + b, 0) / externalHums.length),
        max: Math.max(...externalHums),
      },
    },
  };
}

export function generateWeeklyStatsForHive(
  hiveId: string,
  baseInternalTemp: number,
  baseExternalTemp: number,
  baseInternalHumidity: number,
  baseExternalHumidity: number,
  seed: number
): WeeklyStats {
  const weekData = generateWeeklyData(
    baseInternalTemp,
    baseExternalTemp,
    baseInternalHumidity,
    baseExternalHumidity,
    seed
  );
  const stats = calculateStats(weekData);

  return {
    hiveId,
    weekData,
    ...stats,
  };
}

export const MOCK_WEEKLY_STATS: WeeklyStats[] = [
  generateWeeklyStatsForHive('A002', 35.8, 28.4, 68, 55, 1),
  generateWeeklyStatsForHive('A003', 34.9, 27.8, 65, 52, 2),
  generateWeeklyStatsForHive('A004', 38.2, 29.1, 72, 58, 3),
  generateWeeklyStatsForHive('A005', 36.1, 28.9, 67, 54, 4),
  generateWeeklyStatsForHive('A006', 37.5, 30.2, 70, 60, 5),
  generateWeeklyStatsForHive('A007', 35.2, 27.5, 64, 51, 6),
  generateWeeklyStatsForHive('A008', 36.8, 28.7, 69, 56, 7),
  generateWeeklyStatsForHive('A009', 39.1, 31.3, 75, 62, 8),
];
