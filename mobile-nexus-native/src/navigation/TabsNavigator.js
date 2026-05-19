import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import BooksListScreen from '../screens/BooksListScreen';
import SucursalListScreen from '../screens/SucursalListScreen';
import { colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

/**
 * Bottom Tabs navigator — esqueleto creado por Cristian.
 * Las pantallas Catálogo y Sucursales serán completadas por el compañero.
 *
 * Estructura:
 *   - Inicio     → HomeScreen     (Cristian — landing/hero + acceso al catálogo)
 *   - Catálogo   → BooksListScreen (Compañero)
 *   - Sucursales → SucursalListScreen (Compañero)
 */
export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: 'Inter_700Bold' },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarLabelStyle: { fontFamily: 'Inter_500Medium', fontSize: 12 }
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>🏠</Text>,
          title: 'Nexus · Inicio'
        }}
      />
      <Tab.Screen
        name="Catálogo"
        component={BooksListScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>📚</Text>
        }}
      />
      <Tab.Screen
        name="Sucursales"
        component={SucursalListScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Text style={{ color, fontSize: size }}>📍</Text>
        }}
      />
    </Tab.Navigator>
  );
}
