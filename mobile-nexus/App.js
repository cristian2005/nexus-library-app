import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NexusWebView from './src/NexusWebView';
import { BRAND } from './src/config';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={BRAND.primary} />
      <NexusWebView />
    </SafeAreaProvider>
  );
}
