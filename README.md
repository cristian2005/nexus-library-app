# 📚 Actividad 1 DAMW — Librería Nexus

Entrega de la **Actividad 1** de la asignatura *Aplicaciones Móviles Multiplataforma* del máster UNIR: desarrollo de una aplicación móvil **WebView** que embebe una aplicación web desplegada públicamente.

## 📂 Estructura de la entrega

```
Actividad 1 DAMW/
├── Autores.txt               # Autoría de la actividad
├── README.md                 # Este archivo
├── api-nexus/                # API mock (json-server) — desplegada en Render
├── web-nexus/                # Proyecto web (React + Vite)  — desplegado en Vercel
└── mobile-nexus/             # Proyecto móvil (Expo + React Native + WebView)
```

## 🗺️ Dominio del proyecto

La aplicación representa la **Librería Nexus**, espacio multifuncional que combina librería universitaria, zona de co-working y cafetería (proyecto transversal del máster).

Ofrece:
- Catálogo de libros por sucursal (Madrid, Barcelona, Valencia, Sevilla)
- Detalle de cada libro con sinopsis, stock, ISBN, precio…
- Formulario de **compra** o **reserva** con selección de fecha y número de ejemplares
- Información de cada sucursal (dirección, horario, co-working)
- Autenticación (rutas privadas protegidas con React Router)
- Modo oscuro / claro

## 🛠️ Cómo ejecutar

### 1) Proyecto web (`web-nexus/`)

```bash
cd web-nexus
npm install
npm run dev       # http://localhost:5173
npm run build     # genera /dist listo para producción
```

Despliega el contenido en **Vercel** (el archivo `vercel.json` ya configura la SPA). La URL resultante es la que debe usar la app móvil.

### 2) Proyecto móvil (`mobile-nexus/`)

Edita [`mobile-nexus/src/config.js`](mobile-nexus/src/config.js) y coloca la URL pública de Vercel obtenida en el paso anterior:

```js
export const NEXUS_WEB_URL = 'https://<tu-proyecto>.vercel.app';
```

Después:

```bash
cd mobile-nexus
npm install
npm start         # abre Metro + genera QR para Expo Go
```

Escanea el QR con la app **Expo Go** en tu móvil para probar la app en un dispositivo real.

## 🧪 Características cubiertas por la rúbrica

| Criterio | Implementación |
|----------|----------------|
| **Adecuación de la aplicación web** (3 pts) | Proyecto base (`UnirCs/front-end-cinema`) transformado a Nexus: nuevos datos, vistas, componentes, rutas, tema, CSS responsive completo. |
| **Aplicación móvil WebView + navegabilidad** (5 pts) | Expo + React Native + `react-native-webview`. Barra inferior con atrás / adelante / recargar / inicio. Manejo del botón físico Android. Progress bar, pantalla de error, pull-to-refresh, SafeArea. |
| **Uso de IA generativa** (1 pt) | Se documenta en la vídeo memoria (prompts, resultados, porcentajes y líneas generadas). |
| **Vídeo memoria** (1 pt) | Grabada aparte siguiendo la estructura: modificaciones web, demo móvil, conclusiones. |
