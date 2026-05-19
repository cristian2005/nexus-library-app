import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

/**
 * SucursalDetailScreen — PLACEHOLDER (a desarrollar por el compañero).
 *
 * Especificación esperada:
 *   - Recibe params.branchId (madrid | barcelona | valencia | sevilla).
 *   - Fetch a /api/branches/:id con fetchBranchById(id).
 *   - Mostrar: nombre, dirección, teléfono, horario, wifi, parking, coworkingSeats.
 *   - Sección con los libros disponibles de la sucursal.
 *   - Estilos Nativewind.
 */
export default function SucursalDetailScreen() {
  const route = useRoute();
  const { branchId } = route.params || {};

  return (
    <SafeAreaView className="flex-1 bg-surface-alt items-center justify-center p-6">
      <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-ink mb-3">
        📍 Sucursal {branchId || '(sin id)'}
      </Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-muted text-center">
        Pantalla en desarrollo por el compañero.{'\n'}
        Debe mostrar el detalle completo y los libros disponibles en la sucursal.
      </Text>
    </SafeAreaView>
  );
}
