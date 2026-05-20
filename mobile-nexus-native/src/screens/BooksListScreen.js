import React, { useState, useMemo } from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { useBooks } from '../hooks/useBooks';
import { BRANCHES_FALLBACK } from '../config';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import { colors } from '../theme/colors';

const branchOptions = [
  { id: null, label: 'Todas' },
  { id: 'madrid', label: 'Madrid' },
  { id: 'barcelona', label: 'Barcelona' },
  { id: 'valencia', label: 'Valencia' },
  { id: 'sevilla', label: 'Sevilla' }
];

export default function BooksListScreen() {
  const navigation = useNavigation();
  const [branch, setBranch] = useState(null);
  const { books, loading, error, refetch } = useBooks(branch);

  const title = useMemo(() => {
    if (!branch) return 'Catálogo completo';
    return `Catálogo · ${BRANCHES_FALLBACK[branch] || branch}`;
  }, [branch]);

  const handleBranchChange = async (newBranch) => {
    await Haptics.selectionAsync();
    setBranch(newBranch);
  };

  const handleBookPress = async (bookId) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('BookDetail', { bookId });
  };

  const onRefresh = () => refetch(branch);

  return (
    <SafeAreaView className="flex-1 bg-surface-alt">
      <View className="px-5 pt-5 pb-3 border-b border-border bg-surface">
        <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-ink">
          {title}
        </Text>
        <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted mt-1">
          Filtra por sucursal para ver el catálogo disponible.
        </Text>
      </View>

      <View className="px-5 py-4 bg-surface border-b border-border">
        <FlatList
          data={branchOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => String(item.id ?? 'all')}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleBranchChange(item.id)}
              className={`px-4 py-2 rounded-full mr-3 ${branch === item.id ? 'bg-primary' : 'bg-surface'} ${branch === item.id ? 'border-transparent' : 'border border-border'}`}
              style={branch === item.id ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 } } : {}}
            >
              <Text style={{ fontFamily: branch === item.id ? 'Inter_700Bold' : 'Inter_500Medium' }} className={`${branch === item.id ? 'text-white' : 'text-ink'}`}>
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {loading && <Spinner message="Buscando libros…" />}

      {!loading && error && (
        <View className="px-5 mt-6">
          <ErrorState message={error} onRetry={onRefresh} />
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={books}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} tintColor={colors.primary} />}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-20 px-4">
              <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-base text-muted mb-2">
                No hay libros disponibles en esta sucursal.
              </Text>
              <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted text-center">
                Prueba otro filtro o actualiza la lista.
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <BookCard
              book={item}
              onPress={() => handleBookPress(item.id)}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}
