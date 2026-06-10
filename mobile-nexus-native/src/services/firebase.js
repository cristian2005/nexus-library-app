import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Config del proyecto Firebase "nexus-app-c0888" (proyecto académico, plan Spark).
// La apiKey de Firebase NO es un secreto — la seguridad la dan Authentication + Security Rules.
const firebaseConfig = {
  apiKey: 'AIzaSyDTFUuEbV34JCHCh-xyIaFZ7UEhpaHeD-k',
  authDomain: 'nexus-app-c0888.firebaseapp.com',
  projectId: 'nexus-app-c0888',
  storageBucket: 'nexus-app-c0888.firebasestorage.app',
  messagingSenderId: '633503461462',
  appId: '1:633503461462:web:e9bed05f2b72d9724b0bf7',
};

const app = initializeApp(firebaseConfig);

// initializeAuth + getReactNativePersistence: la sesión persiste en AsyncStorage
// entre reinicios de la app. Sin esto, cada vez que cierras Expo Go pides login.
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;
