import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * BooksListScreen — PLACEHOLDER (a desarrollar por el compañero).
 *
 * Especificación esperada:
 *   - Selector de sucursal (madrid/barcelona/valencia/sevilla)
 *   - Lista de libros (uso de FlatList recomendado) filtrada por sucursal
 *   - Hook useBooks(branch) ya disponible en src/hooks/useBooks.js
 *   - Cada item navega a 'BookDetail' con params { bookId }
 *   - Estilos con Nativewind (colores del tema: primary, accent, surface…)
 *   - Spinner mientras loading; ErrorState con botón reintentar
 */
export default function BooksListScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface-alt items-center justify-center p-6">
      <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-ink mb-3">
        📚 Catálogo
      </Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-muted text-center">
        Pantalla en desarrollo por el compañero.{'\n'}
        Debe mostrar la lista de libros filtrable por sucursal usando el hook useBooks.
      </Text>
    </SafeAreaView>
  );
}
