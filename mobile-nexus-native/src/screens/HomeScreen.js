import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { useBooks } from '../hooks/useBooks';
import { fetchBranches } from '../hooks/useBooks';
import { BRAND, BRANCHES_FALLBACK } from '../config';
import { colors } from '../theme/colors';

/**
 * HomeScreen — Landing de la aplicación (Cristian).
 *
 * Contenido:
 *   - Hero con marca Nexus y tagline.
 *   - Resumen de servicios (libros, co-working, cafetería).
 *   - Sucursales rápidas (chips clicables).
 *   - Sección destacada: primeros 3 libros del catálogo global → BookDetail.
 *   - CTA para ir al Tab Catálogo completo.
 */
export default function HomeScreen() {
  const navigation = useNavigation();
  const { books, loading, error, refetch } = useBooks(null); // null = todos los libros
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchBranches().then(setBranches).catch(() => setBranches([]));
  }, []);

  const featured = books.slice(0, 3);

  return (
    <SafeAreaView edges={['left', 'right']} className="flex-1 bg-surface-alt">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => refetch(null)} tintColor={colors.primary} />
        }
      >
        {/* === Hero === */}
        <View className="bg-primary px-5 pt-8 pb-10 rounded-b-3xl">
          <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-4xl text-white">
            📚 {BRAND.name}
          </Text>
          <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-base text-white/85 mt-1">
            {BRAND.tagline}
          </Text>
          <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-white/75 mt-4 leading-5">
            {BRAND.description}
          </Text>

          <Pressable
            onPress={() => navigation.navigate('Catálogo')}
            className="bg-accent self-start px-5 py-3 rounded-xl mt-6 active:opacity-80"
          >
            <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-ink">
              Explorar catálogo →
            </Text>
          </Pressable>
        </View>

        {/* === Servicios === */}
        <View className="px-5 mt-6">
          <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-xl text-ink mb-3">
            ¿Qué encontrarás en Nexus?
          </Text>

          <View className="bg-surface rounded-2xl p-4 border border-border mb-3">
            <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-base text-primary">
              📖 Compra y alquiler de libros
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted mt-1">
              Catálogo académico y de ficción con precios reducidos para estudiantes UNIR.
            </Text>
          </View>

          <View className="bg-surface rounded-2xl p-4 border border-border mb-3">
            <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-base text-primary">
              💻 Zona de co-working
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted mt-1">
              Puestos individuales y salas de estudio con Wi-Fi de fibra óptica.
            </Text>
          </View>

          <View className="bg-surface rounded-2xl p-4 border border-border">
            <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-base text-primary">
              ☕ Cafetería
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted mt-1">
              Café de especialidad y repostería casera mientras estudias o lees.
            </Text>
          </View>
        </View>

        {/* === Sucursales rápidas === */}
        <View className="px-5 mt-6">
          <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-xl text-ink mb-3">
            Nuestras sucursales
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {(branches.length ? branches : Object.entries(BRANCHES_FALLBACK).map(([id, name]) => ({ id, name })))
              .map(b => (
                <Pressable
                  key={b.id}
                  onPress={async () => {
                    await Haptics.selectionAsync();
                    navigation.navigate('SucursalDetail', { branchId: b.id });
                  }}
                  className="bg-primary/10 px-4 py-2 rounded-full active:opacity-70"
                >
                  <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-primary-dark">
                    📍 {b.name?.replace(/^Nexus\s+/i, '') || BRANCHES_FALLBACK[b.id]}
                  </Text>
                </Pressable>
              ))}
          </View>
        </View>

        {/* === Destacados === */}
        <View className="px-5 mt-6">
          <View className="flex-row justify-between items-end mb-3">
            <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-xl text-ink">
              Destacados
            </Text>
            <Pressable onPress={() => navigation.navigate('Catálogo')}>
              <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-primary text-sm">
                Ver todos →
              </Text>
            </Pressable>
          </View>

          {loading && (
            <View className="items-center py-8">
              <ActivityIndicator color={colors.primary} size="large" />
              <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-muted text-sm mt-2">
                Cargando catálogo…
              </Text>
            </View>
          )}

          {error && !loading && (
            <View className="bg-red-50 border border-red-200 rounded-xl p-4">
              <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-red-700">
                ⚠️ {error}
              </Text>
              <Pressable onPress={() => refetch(null)} className="mt-2">
                <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-primary">
                  Reintentar
                </Text>
              </Pressable>
            </View>
          )}

          {!loading && !error && featured.map(book => (
            <Pressable
              key={book.id}
              onPress={() => navigation.navigate('BookDetail', { bookId: book.id })}
              className="bg-surface rounded-2xl border border-border mb-3 overflow-hidden active:opacity-80 flex-row"
            >
              <Image
                source={{ uri: book.image }}
                style={{ width: 80, height: 110, backgroundColor: colors.surfaceAlt }}
              />
              <View className="flex-1 p-3 justify-center">
                <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-base text-ink" numberOfLines={1}>
                  {book.title}
                </Text>
                <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-xs text-muted mt-1">
                  por {book.author}
                </Text>
                <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-xs text-primary mt-2">
                  {book.genre} · {book.price} €
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
