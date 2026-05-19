# 📱 Nexus Nativo — Actividad 2 DAMW

Aplicación móvil **nativa** (Expo + React Native) para la **Actividad 2** de la asignatura *Aplicaciones Móviles Multiplataforma* (UNIR).

Reutiliza la misma API mock que la Actividad 1: `https://nexus-api-library.onrender.com`.

## 🧱 Stack técnico

- **Expo SDK 54** + React Native 0.81
- **React Navigation 7** — Stack (`@react-navigation/native-stack`) + Bottom Tabs (`@react-navigation/bottom-tabs`)
- **Nativewind 4** (Tailwind CSS para RN)
- **2 fuentes Google** (Inter sans-serif + Lora serif) vía `@expo-google-fonts/*`
- **expo-haptics** para retroalimentación háptica (a implementar)
- API: `fetch` contra el mock server desplegado en Render

## 🗺️ Mapa de navegación

```
NavigationContainer
└── RootStack (createNativeStackNavigator)
    ├── MainTabs (createBottomTabNavigator)
    │   ├── Inicio       → HomeScreen
    │   ├── Catálogo     → BooksListScreen
    │   └── Sucursales   → SucursalListScreen
    ├── BookDetail
    ├── Reserva
    └── SucursalDetail
```

Dos tipos de navegación implementados: **Stack** (raíz) + **Tabs** (anidados).

## 📂 Estructura

```
mobile-nexus-native/
├── App.js                    # Entry point — fonts + StatusBar + RootNavigator
├── app.json                  # Config Expo (nombre, splash, plugin expo-font)
├── babel.config.js           # nativewind/babel + jsxImportSource
├── metro.config.js           # withNativeWind
├── tailwind.config.js        # Preset Nativewind + colores Nexus + fontFamily
├── global.css                # @tailwind base/components/utilities
└── src/
    ├── config.js             # API_URL + constantes de marca
    ├── theme/
    │   ├── colors.js         # Paleta espejo de Tailwind para StyleSheet
    │   └── fonts.js          # useAppFonts() — carga Inter + Lora
    ├── hooks/
    │   └── useBooks.js       # Hook + funciones de fetch (libros, sucursales)
    ├── navigation/
    │   ├── RootNavigator.js  # Stack raíz
    │   └── TabsNavigator.js  # Bottom Tabs
    └── screens/
        ├── HomeScreen.js              # ✅ Cristian
        ├── BookDetailScreen.js        # ✅ Cristian
        ├── BooksListScreen.js         # 🚧 PLACEHOLDER (compañero)
        ├── SucursalListScreen.js      # 🚧 PLACEHOLDER (compañero)
        ├── SucursalDetailScreen.js    # 🚧 PLACEHOLDER (compañero)
        └── ReservaScreen.js           # 🚧 PLACEHOLDER (compañero)
```

## ✅ Lo que ya está hecho (parte Cristian)

| Tarea | Archivo |
|---|---|
| Setup Expo + dependencias | `package.json` |
| Configuración Nativewind | `tailwind.config.js`, `babel.config.js`, `metro.config.js`, `global.css` |
| Carga de 2 fuentes Google (Inter + Lora) | `src/theme/fonts.js` |
| Paleta de colores Nexus | `src/theme/colors.js` + `tailwind.config.js` |
| Hook `useBooks` + fetch helpers | `src/hooks/useBooks.js` |
| Stack Navigator raíz | `src/navigation/RootNavigator.js` |
| Bottom Tabs (esqueleto) | `src/navigation/TabsNavigator.js` |
| Landing / HomeScreen | `src/screens/HomeScreen.js` |
| Detalle de libro | `src/screens/BookDetailScreen.js` |

## 🚧 Lo pendiente (parte del compañero)

Cada placeholder tiene un **comentario al inicio** describiendo lo que debe hacer:

1. **`BooksListScreen.js`** — listado del catálogo filtrable por sucursal (usar `useBooks(branch)`).
2. **`SucursalListScreen.js`** — lista de las 4 sucursales (usar `fetchBranches()`).
3. **`SucursalDetailScreen.js`** — detalle de sucursal con sus libros (usar `fetchBranchById(id)`).
4. **`ReservaScreen.js`** — formulario de reserva/compra con **retroalimentación háptica obligatoria** al confirmar (usar `Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)` de `expo-haptics`).

## 🎨 Cómo usar Nativewind

```jsx
import { View, Text } from 'react-native';

<View className="bg-primary p-4 rounded-xl">
  <Text className="text-white text-lg" style={{ fontFamily: 'Inter_700Bold' }}>
    Hola Nexus
  </Text>
</View>
```

Las fuentes se aplican con `style={{ fontFamily: '...' }}` (Nativewind/Tailwind no soporta `font-family` arbitrario en RN). Fuentes disponibles:

- `Inter_400Regular`, `Inter_500Medium`, `Inter_700Bold`
- `Lora_400Regular`, `Lora_700Bold`

Colores Nativewind disponibles (definidos en `tailwind.config.js`):

- `primary`, `primary-dark`, `primary-light`
- `accent`, `accent-dark`
- `surface`, `surface-alt`, `ink`, `muted`, `border`

## 🛠️ Comandos

```bash
npm install     # primera vez
npm start       # arranca Metro + QR para Expo Go
npm run android # emulador Android
npm run ios     # solo macOS
```

## 📦 Entrega

ZIP sin `node_modules/` + vídeo MP4 (~10 min) en OneDrive corporativo UNIR.
