import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabsNavigator from './TabsNavigator';
import BookDetailScreen from '../screens/BookDetailScreen';
import SucursalDetailScreen from '../screens/SucursalDetailScreen';
import ReservaScreen from '../screens/ReservaScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator();

/**
 * Navegador raíz.
 *
 * Conmuta entre dos stacks según el estado de sesión de Firebase:
 *   - SIN sesión → AuthStack (Login + Register)
 *   - CON sesión → AppStack (Tabs + Detail + Reserva + SucursalDetail)
 *
 * La conmutación es automática: cuando AuthContext detecta cambio en `user`,
 * el árbol se re-renderiza y React Navigation desmonta el stack anterior.
 */
export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surfaceAlt }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 12, color: colors.muted }}>Cargando sesión…</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontFamily: 'Inter_700Bold' },
          headerBackTitleVisible: false,
        }}
      >
        {user ? (
          <>
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
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: 'Crear cuenta' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
