import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * SucursalListScreen — PLACEHOLDER (a desarrollar por el compañero).
 *
 * Especificación esperada:
 *   - Lista de las 4 sucursales (GET /api/branches con fetchBranches()).
 *   - Cada item navega a 'SucursalDetail' con params { branchId }.
 *   - Estilos Nativewind.
 *   - Considerar incluir Haptics.selectionAsync() al tocar cada sucursal.
 */
export default function SucursalListScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface-alt items-center justify-center p-6">
      <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-ink mb-3">
        📍 Sucursales
      </Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-muted text-center">
        Pantalla en desarrollo por el compañero.{'\n'}
        Debe listar las 4 sucursales con fetchBranches() y navegar a SucursalDetail.
      </Text>
    </SafeAreaView>
  );
}
