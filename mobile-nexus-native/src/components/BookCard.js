import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export default function BookCard({ book, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-surface border border-border rounded-3xl overflow-hidden mb-4 flex-row"
      style={{ shadowColor: colors.ink, shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }}
    >
      <Image
        source={{ uri: book.image }}
        className="w-24 h-32 bg-surface-alt"
        style={{ resizeMode: 'cover' }}
      />
      <View className="flex-1 p-4 justify-between">
        <View>
          <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-base text-ink mb-1" numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-sm text-primary mb-1">
            {book.author}
          </Text>
          <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted">
            {book.genre} · {book.language}
          </Text>
        </View>

        <View className="flex-row justify-between items-end mt-4">
          <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-base text-primary">
            {book.price?.toFixed(2)} €
          </Text>
          <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-xs text-muted">
            {book.stock} ejemplares
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
