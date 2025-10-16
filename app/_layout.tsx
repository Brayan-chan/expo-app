/**
 * @fileoverview Layout principal de la aplicación
 * 
 * Este archivo configura el layout raíz de la aplicación, incluyendo:
 * - Proveedores de contexto (QueryClient, Language)
 * - Configuración del splash screen
 * - Sistema de navegación principal
 * - Gestión del estado de carga inicial
 * 
 * @module RootLayout
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LanguageProvider } from "@/contexts/LanguageContext";
import CustomSplashScreen from "@/components/CustomSplashScreen";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

/**
 * Componente de navegación raíz
 * 
 * Configura la navegación principal de la aplicación utilizando expo-router
 * con una estructura de Stack para la navegación.
 * 
 * @returns {React.ReactElement} Stack de navegación raíz
 */
function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Back" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

/**
 * Componente principal de layout
 * 
 * Gestiona:
 * - Estado de carga inicial
 * - Proveedores de contexto globales
 * - Splash screen personalizado
 * 
 * @returns {React.ReactElement} Layout raíz de la aplicación
 */
export default function RootLayout() {
  // Oculta el splash screen nativo después de 2 segundos
  useEffect(() => {
    const timer = setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Estado para controlar el splash screen personalizado
  const [isLoading, setIsLoading] = useState(true);

  // Oculta el splash screen personalizado después de 3.5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Muestra el splash screen personalizado mientras carga
  if (isLoading) {
    return <CustomSplashScreen />;
  }

  // Renderiza la aplicación una vez completada la carga
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
