import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function ErrorState({ message, onRetry }) {
  return (
    <View className="bg-red-50 border border-red-200 rounded-3xl p-5 items-center">
      <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-red-800 text-base mb-2 text-center">
        ⚠️ Algo salió mal
      </Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-red-700 text-center mb-4">
        {message || 'No se pudo cargar la información.'}
      </Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          className="bg-red-600 px-4 py-2 rounded-full active:opacity-80"
        >
          <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-white">
            Reintentar
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
