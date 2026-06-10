# Handoff — Actividad 3 (parte del compañero)

Documento de traspaso para que el compañero/a de equipo se ponga al día rápido y sepa exactamente qué tiene que hacer. Léelo antes de tocar nada.

---

## 📦 Qué hay ya hecho (no tocar, ya funciona)

Toda la base de Firebase Authentication ya está integrada y probada:

| Archivo | Qué hace |
|---|---|
| `src/services/firebase.js` | Inicializa Firebase + Auth con persistencia AsyncStorage |
| `src/context/AuthContext.js` | Provider con `user`, `loading`, `signIn`, `signUp`, `signOut` |
| `src/screens/LoginScreen.js` | Pantalla de login completa (email/password, validación, errores en español) |
| `src/screens/RegisterScreen.js` | **Placeholder con TODO — esto lo haces tú** |
| `src/navigation/RootNavigator.js` | Conmuta entre AuthStack y AppStack según `user` |
| `App.js` | Envuelto con `<AuthProvider>` |
| `eas.json` + `app.json` | EAS Update configurado (branch `preview` publicado) |

**Proyecto Firebase**: `nexus-app-c0888`
**Método auth habilitado**: Email/contraseña
**Console**: https://console.firebase.google.com/project/nexus-app-c0888

**Proyecto EAS**: `@cristian2005/nexus-libreria-nativo`
**Branch del update**: `preview`
**Dashboard**: https://expo.dev/accounts/cristian2005/projects/nexus-libreria-nativo/branches/preview

---

## 🚀 Setup inicial (la primera vez que clones el repo)

```bash
# 1. Clonar
git clone https://github.com/cristian2005/nexus-library-app.git
cd nexus-library-app/mobile-nexus-native

# 2. Instalar dependencias
npm install

# 3. Arrancar
npm start
```

Escanea el QR con **Expo Go** en tu móvil. Te aparecerá el `LoginScreen`.

Para entrar a la app: pide a Cristian que te dé las credenciales del usuario de prueba que creó en Firebase Console, o crea uno tú mismo desde la consola (Authentication → Users → "Agregar usuario").

---

## ✅ Tus tareas

### 1) Implementar `RegisterScreen` real

Borra el placeholder actual de `src/screens/RegisterScreen.js` y crea la pantalla real.

**Patrón** (mira `LoginScreen.js` como guía):

- 3 `TextInput`: `email`, `password`, `confirmPassword`
- Opcional: 4º campo `displayName` (nombre visible)
- Validar antes de enviar:
  - Que email no esté vacío
  - Que las passwords coincidan
  - Que password tenga al menos 6 caracteres (Firebase exige mínimo 6)
- Botón "Crear cuenta" → llama a `useAuth().signUp(email, password, displayName)`
- En éxito: **no llames a `navigation.navigate`**. El `AuthProvider` detecta el nuevo user automáticamente y `RootNavigator` conmuta solo al stack privado.
- En error: mapea códigos de Firebase a mensajes en español:

```js
const errorMessage = (code) => {
  switch (code) {
    case 'auth/email-already-in-use': return 'Ese correo ya está registrado.';
    case 'auth/invalid-email':         return 'El correo no es válido.';
    case 'auth/weak-password':         return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/network-request-failed': return 'Sin conexión. Revisa tu internet.';
    default: return 'No se pudo crear la cuenta. Inténtalo de nuevo.';
  }
};
```

### 2) Añadir botón Logout

Decide tú dónde ponerlo (recomendado: header de Home, o crea una nueva pantalla "Perfil" como cuarta tab).

```jsx
import { useAuth } from '../context/AuthContext';

const { signOut, user } = useAuth();

<TouchableOpacity onPress={() => signOut()}>
  <Text>Cerrar sesión</Text>
</TouchableOpacity>
```

Tras `signOut()`, `RootNavigator` vuelve al `LoginScreen` automáticamente.

### 3) Mostrar info del usuario en alguna pantalla

En `HomeScreen.js` (o donde decidas), añade un saludo con la info del user logueado:

```jsx
import { useAuth } from '../context/AuthContext';

const { user } = useAuth();

<Text>Hola, {user.displayName || user.email}</Text>
```

### 4) Conectar `ReservaScreen` al usuario real

En `src/screens/ReservaScreen.js` busca dónde se manda el `userId` (probablemente hardcodeado a algo tipo `'user-001'` o similar). Cámbialo por el UID real:

```jsx
const { user } = useAuth();
// ...
const reserva = {
  ...,
  userId: user.uid,   // ← antes era hardcodeado
  userEmail: user.email,
};
```

### 5) Grabar la vídeomemoria (10 min)

Estructura exigida por la rúbrica:

1. **Proyecto Firebase** — abre la consola, muestra el proyecto, los usuarios registrados visibles en la tabla, el método auth habilitado.
2. **OTA con EAS** — abre el dashboard de EAS, muestra el QR público, escanéalo desde un móvil físico para probar que abre la app.
3. **Tour virtual** — recorre TODAS las vistas de la app:
   - Login + Register
   - Home con saludo del user
   - Lista de libros por sucursal
   - Detalle de un libro
   - Reserva con `user.uid`
   - Lista de sucursales + detalle de una
   - Logout
   - **IMPORTANTE**: en alguna parte enseña los DevTools / Network del navegador o Logcat para demostrar que las peticiones van al API (`https://nexus-api-library.onrender.com/api/books`, etc.).
4. **Conclusiones** — qué aprendiste, qué fue complicado, feedback.

**Subida del vídeo**:
- Formato MP4
- Sube a **OneDrive corporativo** con tu cuenta `@comunidadunir`
- Genera enlace público (pruébalo en ventana de incógnito)
- ❌ NO Google Drive personal, YouTube, MEGA, etc.

---

## 🔄 Después de tus cambios — publicar update final

Cuando termines tus 4 tareas de código, **hay que volver a publicar a EAS** para que el QR de la entrega muestre la versión completa:

```bash
cd mobile-nexus-native
eas update --branch preview --message "v2 con register, logout, reserva conectada"
```

> Si te pide login, ejecuta `eas login` primero. Pide a Cristian acceso al proyecto EAS si te da error de permisos (Cristian → settings del proyecto → agregar miembro).

Luego ve al dashboard y verifica que el nuevo update aparece en la branch `preview`.

---

## 🆘 Si algo va mal

| Síntoma | Solución |
|---|---|
| Metro no arranca | `rm -rf node_modules && npm install` |
| Error `Component auth has not been registered` | Reinicia Metro con `--clear`: `npm start -- --clear` |
| Login dice "auth/network-request-failed" | Móvil sin internet o Firebase project mal configurado |
| Las imágenes de libros no cargan | Ya está arreglado en `useBooks.js` (transforma URL a `.png`) |
| Expo Go dice runtime mismatch | Actualiza Expo Go en la Play Store / App Store |

---

## 📋 Checklist antes de entregar

- [ ] `RegisterScreen` funcional (puedes registrar un user nuevo desde la app)
- [ ] Botón logout visible y funcional
- [ ] `user.email` o `displayName` aparece en alguna pantalla
- [ ] `ReservaScreen` usa `user.uid`
- [ ] `eas update --branch preview` publicado con tus cambios
- [ ] QR del dashboard escaneable y carga la app
- [ ] Vídeomemoria 10 min en MP4
- [ ] Vídeo subido a OneDrive corporativo, enlace público
- [ ] ZIP con la carpeta `mobile-nexus-native` SIN `node_modules`

¡Suerte! 🚀
