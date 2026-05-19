# 📚 Nexus — Librería universitaria (Web)

Aplicación web del proyecto transversal **Librería Nexus** desarrollada para la Actividad 1 de la asignatura **Aplicaciones Móviles Multiplataforma** (UNIR).

Este proyecto web sirve como **base del WebView** que carga la aplicación móvil (Expo + React Native WebView) incluida en el directorio hermano `mobile-nexus`.

## 🚀 Tecnologías

- **React 19** + **Vite 7**
- **React Router DOM 7** (navegación entre vistas)
- **Context API** (estado global: sucursal, modo oscuro, autenticación)
- **Custom Hooks** (`useBooks`)
- Diseño 100 % **responsive** para móviles, tablet y escritorio

## 🗺️ Vistas

| Ruta | Vista | Acceso |
|------|-------|--------|
| `/` | Catálogo por sucursal + selector | Pública |
| `/about` | Información de Nexus y sucursales | Pública |
| `/libro/:id` | Detalle de un libro | Pública |
| `/libro/:id/reserva/:date` | Formulario compra / reserva | 🔒 Privada |
| `/sucursal/:branch` | Detalle de la sucursal | 🔒 Privada |
| `/login` | Autenticación | Pública |
| `/admin` | Panel de administración | 🔒 Privada (admin) |

## 👤 Usuarios de prueba

| Usuario | Contraseña | Rol |
|---------|-----------|-----|
| `admin` | `admin123` | admin |
| `user` | `user123` | estudiante |
| `docente` | `docente123` | manager |

## 🛠️ Instalación y uso

```bash
npm install
npm run dev        # arranca en http://localhost:5173
npm run build      # genera /dist listo para Vercel
npm run preview    # previsualiza /dist
```

## 📦 Despliegue en Vercel

El archivo `vercel.json` ya configura la SPA. Conecta el repo en Vercel y despliega en un clic.

---

Desarrollado como actividad académica de UNIR.
