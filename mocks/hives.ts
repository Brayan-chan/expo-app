export interface Hive {
  id: string;
  name: string;
  status: 'healthy' | 'alert';
  location: string;
  internalTemp: number;
  externalTemp: number;
  internalHumidity: number;
  externalHumidity: number;
  pesticidesDetected: boolean;
}

export const MOCK_HIVES: Hive[] = [
  {
    id: 'A002',
    name: 'Colmena 1',
    status: 'healthy',
    location: '20.9670° N, 89.5925° W',
    internalTemp: 35.8,
    externalTemp: 28.4,
    internalHumidity: 68,
    externalHumidity: 55,
    pesticidesDetected: false,
  },
  {
    id: 'A003',
    name: 'Colmena 2',
    status: 'healthy',
    location: '19.6570° N, 89.6030° E',
    internalTemp: 34.9,
    externalTemp: 27.8,
    internalHumidity: 65,
    externalHumidity: 52,
    pesticidesDetected: false,
  },
  {
    id: 'A004',
    name: 'Colmena 3',
    status: 'alert',
    location: '21.9670° N, 92.7045° W',
    internalTemp: 38.2,
    externalTemp: 29.1,
    internalHumidity: 72,
    externalHumidity: 58,
    pesticidesDetected: true,
  },
  {
    id: 'A005',
    name: 'Colmena 4',
    status: 'healthy',
    location: '30.2370° N, 89.1425° W',
    internalTemp: 36.1,
    externalTemp: 28.9,
    internalHumidity: 67,
    externalHumidity: 54,
    pesticidesDetected: false,
  },
  {
    id: 'A006',
    name: 'Colmena 5',
    status: 'alert',
    location: '30.2370° N, 89.1425° W',
    internalTemp: 37.5,
    externalTemp: 30.2,
    internalHumidity: 70,
    externalHumidity: 60,
    pesticidesDetected: true,
  },
  {
    id: 'A007',
    name: 'Colmena 6',
    status: 'healthy',
    location: '30.2370° N, 89.1425° W',
    internalTemp: 35.2,
    externalTemp: 27.5,
    internalHumidity: 64,
    externalHumidity: 51,
    pesticidesDetected: false,
  },
  {
    id: 'A008',
    name: 'Colmena 7',
    status: 'healthy',
    location: '30.2370° N, 89.1425° W',
    internalTemp: 36.8,
    externalTemp: 28.7,
    internalHumidity: 69,
    externalHumidity: 56,
    pesticidesDetected: false,
  },
  {
    id: 'A009',
    name: 'Colmena 8',
    status: 'alert',
    location: '30.2370° N, 89.1425° W',
    internalTemp: 39.1,
    externalTemp: 31.3,
    internalHumidity: 75,
    externalHumidity: 62,
    pesticidesDetected: true,
  },
];
