import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { fetchBranchById, useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import ErrorState from '../components/ErrorState';
import Spinner from '../components/Spinner';
import { BRANCHES_FALLBACK } from '../config';
import { colors } from '../theme/colors';

export default function SucursalDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { branchId } = route.params || {};

  const { books, loading: booksLoading, error: booksError, refetch: refetchBooks } = useBooks(branchId);
  const [branch, setBranch] = useState(null);
  const [loadingBranch, setLoadingBranch] = useState(true);
  const [errorBranch, setErrorBranch] = useState(null);

  useEffect(() => {
    if (!branchId) return;
    setLoadingBranch(true);
    setErrorBranch(null);
    fetchBranchById(branchId)
      .then(setBranch)
      .catch(err => setErrorBranch(err.message))
      .finally(() => setLoadingBranch(false));
  }, [branchId]);

  const openBook = async (bookId) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('BookDetail', { bookId });
  };

  const refreshAll = () => {
    if (branchId) {
      refetchBooks(branchId);
      setLoadingBranch(true);
      setErrorBranch(null);
      fetchBranchById(branchId)
        .then(setBranch)
        .catch(err => setErrorBranch(err.message))
        .finally(() => setLoadingBranch(false));
    }
  };

  if (loadingBranch || booksLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface-alt">
        <Spinner message="Cargando detalles de la sucursal…" />
      </SafeAreaView>
    );
  }

  if (errorBranch || booksError || !branch) {
    return (
      <SafeAreaView className="flex-1 bg-surface-alt px-5 py-8">
        <ErrorState message={errorBranch || booksError || 'No se encontró la sucursal.'} onRetry={refreshAll} />
      </SafeAreaView>
    );
  }

  const branchName = branch.name || BRANCHES_FALLBACK[branchId] || 'Sucursal Nexus';

  return (
    <SafeAreaView className="flex-1 bg-surface-alt">
      <View className="px-5 pt-5 pb-4 bg-primary">
        <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-3xl text-white">
          {branchName}
        </Text>
        <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-white/80 mt-2">
          {branch.address}
        </Text>
      </View>

      <FlatList
        data={books}
        ListHeaderComponent={
          <View className="px-5 pt-6 pb-4">
            <View className="bg-surface rounded-3xl p-5 border border-border mb-4">
              <View className="flex-row flex-wrap gap-3">
                <InfoChip label="Horario" value={branch.hours} />
                <InfoChip label="Teléfono" value={branch.phone} />
                <InfoChip label="Wi-Fi" value={branch.wifi} />
                <InfoChip label="Parking" value={branch.parking ? 'Disponible' : 'No disponible'} />
                <InfoChip label="Co-working" value={`${branch.coworkingSeats} puestos`} />
              </View>
            </View>

            <View className="flex-row justify-between items-center mb-4">
              <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-xl text-ink">
                Catálogo local
              </Text>
              <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-sm text-muted">
                {books.length} libros
              </Text>
            </View>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 40 }}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View className="h-3" />}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={() => openBook(item.id)} />
        )}
        ListEmptyComponent={() => (
          <View className="px-5 py-20 items-center">
            <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-base text-muted mb-2">
              No hay libros disponibles actualmente en esta sucursal.
            </Text>
            <Pressable
              onPress={() => navigation.goBack()}
              className="bg-primary px-4 py-3 rounded-full active:opacity-80"
            >
              <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-white">
                Volver a sucursales
              </Text>
            </Pressable>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

function InfoChip({ label, value }) {
  return (
    <View className="bg-surface border border-border rounded-2xl px-3 py-2 min-w-[140px]">
      <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-xs text-primary uppercase mb-1">
        {label}
      </Text>
      <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-ink" numberOfLines={2}>
        {value}
      </Text>
    </View>
  );
}
