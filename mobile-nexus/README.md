# 📱 Nexus — Aplicación móvil WebView

Aplicación móvil multiplataforma (iOS / Android) que embebe el proyecto web de **Nexus** utilizando la arquitectura **WebView**. Construida con **Expo** + **React Native** + **react-native-webview**.

Parte de la Actividad 1 de la asignatura **Aplicaciones Móviles Multiplataforma** (UNIR).

## 🚀 Características

- **WebView** que carga la URL pública del proyecto web de Nexus.
- **Barra superior** con branding y la URL actual.
- **Barra inferior** con controles: atrás, adelante, recargar, inicio.
- Soporte del **botón físico "atrás"** de Android (navega hacia atrás en el historial del WebView antes de salir de la app).
- **Barra de progreso** y indicador de carga.
- **Pantalla de error** con botón de reintento y pull-to-refresh.
- **SafeAreaView** para notches y bordes de pantalla modernos.
- Soporte de gestos iOS (swipe para atrás / adelante).

## 🔧 Configuración

Edita el archivo [`src/config.js`](src/config.js) para apuntar a la URL del proyecto web desplegado:

```js
export const NEXUS_WEB_URL = 'https://nexus-library-app.vercel.app';
```

Para desarrollo local con el web en Vite:

```js
export const NEXUS_WEB_URL = 'http://<IP_DEL_PC>:5173';
```

> Nota: el dispositivo físico y el PC deben estar en la misma red Wi-Fi.
> En iOS real, las URLs `http://` pueden requerir configuración adicional (ATS).
> Se recomienda usar una URL `https://` real (Vercel).

## 🛠️ Comandos

```bash
# Instalar dependencias
npm install

# Iniciar Expo Dev Server (abre Metro + QR para Expo Go)
npm start

# Abrir directamente en emulador/dispositivo
npm run android
npm run ios      # solo macOS
```

Escanea el QR que aparece en terminal con la app **Expo Go** (descárgala en tu móvil) para probarla sin cables.

## 📂 Estructura

```
mobile-nexus/
├── App.js              # Entry point — registra SafeAreaProvider y StatusBar
├── app.json            # Config de Expo (nombre, icono, splash, etc.)
├── package.json
├── assets/             # Iconos y splash
└── src/
    ├── config.js       # URL del proyecto web y colores de marca
    └── NexusWebView.js # Componente principal con WebView + navegación
```

## 📦 Dependencias clave

- `expo` ~54
- `react-native` 0.81
- `react-native-webview` 13
- `react-native-safe-area-context` 5
