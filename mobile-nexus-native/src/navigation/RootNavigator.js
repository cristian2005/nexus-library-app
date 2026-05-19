import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from './TabsNavigator';
import BookDetailScreen from '../screens/BookDetailScreen';
import SucursalDetailScreen from '../screens/SucursalDetailScreen';
import ReservaScreen from '../screens/ReservaScreen';

import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

/**
 * Navegador raíz (Stack) — Cristian.
 *
 * Combina dos tipos de navegación:
 *   1) Stack (este componente) para pantallas de detalle/reserva.
 *   2) Tabs (TabsNavigator) anidado dentro como pantalla principal.
 *
 * Flujo:
 *   MainTabs → BookDetail → Reserva
 *   MainTabs → SucursalDetail
 */
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'Inter_700Bold' },
          headerBackTitleVisible: false
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BookDetail"
          component={BookDetailScreen}
          options={{ title: 'Detalle del libro' }}
        />
        <Stack.Screen
          name="Reserva"
          component={ReservaScreen}
          options={{ title: 'Reserva / Compra' }}
        />
        <Stack.Screen
          name="SucursalDetail"
          component={SucursalDetailScreen}
          options={{ title: 'Sucursal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
