import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

export default function CustomSplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/favicon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Kaab Tech</Text>
      
      <Progress.Bar
        style={styles.progressBar}
        progress={1}
        width={200}
        color="#2C3E50"
        unfilledColor="#E0E0E0"
        borderWidth={0}
        animated={true}
        indeterminate={true}
        animationType="spring"
      />

      <View style={styles.footer}>
        <Text style={styles.fromText}>From</Text>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo1.png')}
            style={styles.footerLogo}
            resizeMode="contain"
          />
          <Image
            source={require('../assets/images/logo2.png')}
            style={styles.footerLogo}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 40,
  },
  progressBar: {
    marginVertical: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  fromText: {
    fontSize: 16,
    color: '#5A6C6C',
    marginBottom: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  footerLogo: {
    width: 50,
    height: 50,
  },
});