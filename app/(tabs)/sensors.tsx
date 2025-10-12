import { useLanguage } from '@/contexts/LanguageContext';
import { StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';

export default function SensorsScreen() {
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
