

/**
 * SucursalListScreen — PLACEHOLDER (a desarrollar por el compañero).
 *
 * Especificación esperada:
 *   - Lista de las 4 sucursales (GET /api/branches con fetchBranches()).
 *   - Cada item navega a 'SucursalDetail' con params { branchId }.
 *   - Estilos Nativewind.
 *   - Considerar incluir Haptics.selectionAsync() al tocar cada sucursal.
 */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { fetchBranches } from '../hooks/useBooks';
import ErrorState from '../components/ErrorState';
import Spinner from '../components/Spinner';
import { colors } from '../theme/colors';

export default function SucursalListScreen() {
  const navigation = useNavigation();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBranches = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBranches();
      setBranches(data);
    } catch (err) {
      setError(err.message);
      setBranches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const handlePress = async (branchId) => {
    await Haptics.selectionAsync();
    navigation.navigate('SucursalDetail', { branchId });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-alt">
      <View className="px-5 pt-5 pb-3 bg-surface border-b border-border">
        <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-ink">
          🌍 Sucursales Nexus
        </Text>
        <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted mt-1">
          Elige una sucursal para ver dirección, horario y catálogo disponible.
        </Text>
      </View>

      {loading && <Spinner message="Cargando sucursales…" />}

      {!loading && error && (
        <View className="px-5 mt-6">
          <ErrorState message={error} onRetry={loadBranches} />
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={branches}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View className="h-3" />}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handlePress(item.id)}
              className="bg-surface border border-border rounded-3xl p-5"
              style={{ shadowColor: colors.ink, shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 4 } }}
            >
              <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-lg text-ink mb-2">
                {item.name}
              </Text>
              <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-sm text-primary mb-2">
                {item.address}
              </Text>
              <View className="flex-row flex-wrap gap-2">
                <View className="bg-primary/10 px-3 py-1 rounded-full">
                  <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-primary text-xs">
                    {item.coworkingSeats} puestos
                  </Text>
                </View>
                <View className="bg-surface border border-primary/15 px-3 py-1 rounded-full">
                  <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-primary text-xs">
                    {item.parking ? 'Parking' : 'Sin parking'}
                  </Text>
                </View>
                <View className="bg-surface border border-primary/15 px-3 py-1 rounded-full">
                  <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-primary text-xs">
                    Wi-Fi: {item.wifi}
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
