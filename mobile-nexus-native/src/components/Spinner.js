import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function Spinner({ message = 'Cargando…' }) {
  return (
    <View className="items-center justify-center py-12">
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted mt-3 text-center">
        {message}
      </Text>
    </View>
  );
}
