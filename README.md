# 🐝 Kaab Tech - Aplicación de Monitoreo de Colmenas

## Descripción
Kaab Tech es una aplicación móvil desarrollada con React Native y Expo para el monitoreo y gestión de colmenas. La aplicación permite visualizar datos en tiempo real de sensores, historial de mediciones y configuraciones del sistema.

## Estructura del Proyecto

### Carpetas Principales
- `/app`: Contiene la lógica principal de navegación y pantallas usando Expo Router
  - `/(tabs)`: Implementación de la navegación por tabs
  - `_layout.tsx`: Configuración principal de la navegación
  - `+not-found.tsx`: Pantalla de error 404

### Componentes y Contextos
- `/components`: Componentes reutilizables
- `/contexts`: Contextos de React para el manejo de estado global
- `/constants`: Constantes y configuraciones globales
- `/assets`: Recursos estáticos (imágenes, fuentes, etc.)

## Get started

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
   bunx expo start --clear
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
bun run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
