import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';

/**
 * ReservaScreen — PLACEHOLDER (a desarrollar por el compañero).
 *
 * Especificación esperada:
 *   - Recibe params: { bookId, date }.
 *   - Fetch del libro con fetchBookById(bookId).
 *   - Formulario: modalidad (alquiler/compra), ejemplares, nombre, email.
 *   - Cálculo de precio (20 % alquiler / precio completo compra).
 *   - Al confirmar:
 *       1) Mostrar pantalla de éxito con código generado.
 *       2) IMPORTANTE: usar Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
 *          como retroalimentación háptica obligatoria (Criterio 5 de la rúbrica).
 *   - Estilos Nativewind.
 */
export default function ReservaScreen() {
  const route = useRoute();
  const { bookId, date } = route.params || {};

  return (
    <SafeAreaView className="flex-1 bg-surface-alt items-center justify-center p-6">
      <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-ink mb-3">
        🧾 Reserva
      </Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-muted text-center mb-2">
        Libro: {bookId || '(sin id)'} · Fecha: {date || '(sin fecha)'}
      </Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-muted text-center">
        Pantalla en desarrollo por el compañero.{'\n'}
        Debe implementar el formulario de compra/alquiler con retroalimentación háptica al confirmar.
      </Text>
    </SafeAreaView>
  );
}
