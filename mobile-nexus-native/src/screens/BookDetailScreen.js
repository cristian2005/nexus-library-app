import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import { fetchBookById } from '../hooks/useBooks';
import { colors } from '../theme/colors';

/**
 * BookDetailScreen — Cristian.
 *
 * Recibe `bookId` por params, hace fetch a /api/books/:id y muestra:
 *   - Portada
 *   - Título + autor (con tipografía serif Lora)
 *   - Grid de metadatos (género, páginas, editorial, idioma, ISBN, stock, precio…)
 *   - Sinopsis
 *   - Lista de fechas de disponibilidad (Pressable → Reserva)
 *   - CTA principal "Comprar o reservar"
 */
export default function BookDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId } = route.params || {};

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchBookById(bookId)
      .then(setBook)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [bookId]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-surface-alt items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-muted mt-3">
          Cargando libro…
        </Text>
      </SafeAreaView>
    );
  }

  if (error || !book) {
    return (
      <SafeAreaView className="flex-1 bg-surface-alt items-center justify-center p-6">
        <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-ink mb-2">
          ⚠️ Libro no encontrado
        </Text>
        <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-muted text-center mb-6">
          {error || 'No se pudo cargar la información del libro.'}
        </Text>
        <Pressable
          onPress={load}
          className="bg-primary px-5 py-3 rounded-xl active:opacity-80"
        >
          <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-white">
            Reintentar
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const goToReserva = (date) => {
    navigation.navigate('Reserva', { bookId: book.id, date });
  };

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1 bg-surface-alt">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* === Cabecera con portada === */}
        <View className="bg-primary px-5 pt-6 pb-8 flex-row gap-4">
          <Image
            source={{ uri: book.image }}
            style={{
              width: 110,
              height: 160,
              borderRadius: 8,
              backgroundColor: colors.surfaceAlt
            }}
          />
          <View className="flex-1 justify-center">
            <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-white" numberOfLines={3}>
              {book.title}
            </Text>
            <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-base text-white/85 mt-2">
              por {book.author}
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-white/70 mt-1">
              ⭐ {book.rating} · {book.pages} pág.
            </Text>
          </View>
        </View>

        {/* === Grid de información === */}
        <View className="px-5 mt-4">
          <View className="flex-row flex-wrap -mx-1">
            <InfoItem label="Género" value={book.genre} />
            <InfoItem label="Idioma" value={book.language} />
            <InfoItem label="Año" value={String(book.year)} />
            <InfoItem label="Editorial" value={book.publisher} />
            <InfoItem label="ISBN" value={book.isbn} />
            <InfoItem label="Stock" value={`${book.stock} ejemplares`} />
            <InfoItem label="Precio" value={`${book.price} €`} />
            <InfoItem label="Sucursal" value={book.branch} />
          </View>
        </View>

        {/* === Sinopsis === */}
        <View className="px-5 mt-6">
          <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-xl text-ink mb-2">
            Sinopsis
          </Text>
          <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-base text-ink/80 leading-6">
            {book.synopsis}
          </Text>
        </View>

        {/* === Fechas de disponibilidad === */}
        <View className="px-5 mt-6">
          <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-xl text-ink mb-3">
            Fechas de disponibilidad
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {book.availableDates?.map((date) => (
              <Pressable
                key={date}
                onPress={() => goToReserva(date)}
                className="bg-primary px-4 py-2 rounded-full active:opacity-70"
              >
                <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-white text-sm">
                  {date}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* === CTA principal === */}
        <View className="px-5 mt-8">
          <Pressable
            onPress={() => goToReserva(book.availableDates?.[0])}
            className="bg-accent py-4 rounded-2xl items-center active:opacity-80"
          >
            <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-ink text-base">
              📚 Comprar o reservar
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoItem({ label, value }) {
  return (
    <View className="w-1/2 px-1 mb-2">
      <View className="bg-surface border border-border rounded-xl p-3">
        <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-xs text-primary uppercase">
          {label}
        </Text>
        <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-ink mt-1" numberOfLines={2}>
          {value}
        </Text>
      </View>
    </View>
  );
}
