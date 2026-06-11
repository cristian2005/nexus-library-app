import React, { useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';

import { useAuth } from '../context/AuthContext';

import { fetchBookById } from '../hooks/useBooks';
import Spinner from '../components/Spinner';
import ErrorState from '../components/ErrorState';
import { colors } from '../theme/colors';

const MODES = [
  { key: 'alquiler', label: 'Alquiler' },
  { key: 'compra', label: 'Compra' }
];

export default function ReservaScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { bookId, date } = route.params || {};

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mode, setMode] = useState('alquiler');
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(date || '');
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  useEffect(() => {
    if (!bookId) return;
    setLoading(true);
    setError(null);
    fetchBookById(bookId)
      .then((data) => {
        setBook(data);
        setSelectedDate(date || data.availableDates?.[0] || '');
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [bookId, date]);

  const subtotal = useMemo(() => {
    if (!book) return 0;
    const price = Number(book.price || 0);
    return mode === 'compra' ? price * quantity : price * 0.2 * quantity;
  }, [book, mode, quantity]);

  const handleConfirm = async () => {
    if (!book) return;
    if (!selectedDate) {
      Alert.alert('Fecha requerida', 'Selecciona una fecha disponible para continuar.');
      return;
    }
    if (!name.trim() || !email.trim()) {
      Alert.alert('Datos incompletos', 'Completa tu nombre y correo electrónico.');
      return;
    }

    const reserva = {
      bookId: book.id,
      userId: user?.uid,
      userEmail: user?.email,
      userName: name.trim(),
      mode,
      quantity,
      selectedDate,
      subtotal: subtotal.toFixed(2),
    };

    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const code = `NEXUS-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    setConfirmed({ code, amount: subtotal.toFixed(2), bookTitle: book.title, userEmail: reserva.userEmail });
    Keyboard.dismiss();
  };

  const increaseQuantity = () => setQuantity((q) => Math.min(q + 1, book?.stock || 10));
  const decreaseQuantity = () => setQuantity((q) => Math.max(1, q - 1));

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-surface-alt">
        <Spinner message="Cargando datos del libro…" />
      </SafeAreaView>
    );
  }

  if (error || !book) {
    return (
      <SafeAreaView className="flex-1 bg-surface-alt px-5 py-8">
        <ErrorState
          message={error || 'No se encontró el libro.'}
          onRetry={() => {
            setError(null);
            setLoading(true);
            fetchBookById(bookId)
              .then((data) => {
                setBook(data);
                setLoading(false);
              })
              .catch(err => {
                setError(err.message);
                setLoading(false);
              });
          }}
        />
      </SafeAreaView>
    );
  }

  if (confirmed) {
    return (
      <SafeAreaView className="flex-1 bg-surface-alt px-5 pt-10">
        <View className="bg-surface border border-border rounded-3xl p-6 mx-2 shadow-sm">
          <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-ink mb-4">
            🎉 Reserva confirmada
          </Text>
          <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-base text-primary mb-2">
            Código de reserva
          </Text>
          <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-3xl text-ink mb-4">
            {confirmed.code}
          </Text>
          <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted mb-4">
            {confirmed.bookTitle} · {mode === 'compra' ? 'Compra' : 'Alquiler'} · {selectedDate}
          </Text>
          <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-base text-ink mb-6">
            Total abonado: {confirmed.amount} €
          </Text>
          <Pressable
            onPress={() => navigation.navigate('Catálogo')}
            className="bg-primary px-5 py-3 rounded-2xl items-center active:opacity-80"
          >
            <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-white">
              Volver al catálogo
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface-alt">
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <View className="bg-surface rounded-3xl border border-border p-5 mb-5">
          <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-2xl text-ink mb-2">
            {book.title}
          </Text>
          <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-muted mb-3">
            Fecha seleccionada: {selectedDate || 'Elige abajo'}
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {book.availableDates?.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  Haptics.selectionAsync();
                  setSelectedDate(item);
                }}
                className={`px-4 py-2 rounded-full ${selectedDate === item ? 'bg-primary' : 'bg-surface'} border ${selectedDate === item ? 'border-transparent' : 'border-border'}`}
              >
                <Text style={{ fontFamily: 'Inter_500Medium' }} className={`${selectedDate === item ? 'text-white' : 'text-ink'}`}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="bg-surface rounded-3xl border border-border p-5 mb-5">
          <Text style={{ fontFamily: 'Lora_700Bold' }} className="text-xl text-ink mb-3">
            Datos de la reserva
          </Text>

          <View className="flex-row gap-3 mb-4">
            {MODES.map((item) => (
              <Pressable
                key={item.key}
                onPress={async () => {
                  await Haptics.selectionAsync();
                  setMode(item.key);
                }}
                className={`flex-1 px-4 py-3 rounded-2xl border ${mode === item.key ? 'bg-primary border-transparent' : 'bg-surface border-border'}`}
              >
                <Text style={{ fontFamily: mode === item.key ? 'Inter_700Bold' : 'Inter_500Medium' }} className={`${mode === item.key ? 'text-white' : 'text-ink'} text-center`}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="mb-4">
            <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-sm text-ink mb-2">
              Ejemplares
            </Text>
            <View className="flex-row items-center justify-between bg-surface rounded-2xl border border-border px-3 py-2">
              <Pressable onPress={decreaseQuantity} className="px-4 py-2 bg-surface-alt rounded-2xl active:opacity-70">
                <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-ink text-lg">−</Text>
              </Pressable>
              <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-lg text-ink">{quantity}</Text>
              <Pressable onPress={increaseQuantity} className="px-4 py-2 bg-surface-alt rounded-2xl active:opacity-70">
                <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-ink text-lg">+</Text>
              </Pressable>
            </View>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-xs text-muted mt-2">
              Disponible: {book.stock} ejemplares
            </Text>
          </View>

          <View className="mb-4">
            <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-sm text-ink mb-2">
              Nombre completo
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              className="bg-surface-alt rounded-2xl border border-border px-4 py-3 text-ink"
              placeholderTextColor={colors.muted}
            />
          </View>

          <View className="mb-4">
            <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-sm text-ink mb-2">
              Correo electrónico
            </Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="nombre@mail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-surface-alt rounded-2xl border border-border px-4 py-3 text-ink"
              placeholderTextColor={colors.muted}
            />
          </View>

          <View className="bg-surface-alt rounded-3xl border border-border p-4 mb-5">
            <Text style={{ fontFamily: 'Inter_500Medium' }} className="text-sm text-muted mb-2">
              Resumen
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-ink mb-1">
              Libro: {book.title}
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-ink mb-1">
              Modalidad: {mode === 'compra' ? 'Compra completa' : 'Alquiler 20%'}
            </Text>
            <Text style={{ fontFamily: 'Inter_400Regular' }} className="text-sm text-ink mb-1">
              Fecha: {selectedDate || 'No seleccionada'}
            </Text>
            <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-base text-primary mt-2">
              Total: {subtotal.toFixed(2)} €
            </Text>
          </View>

          <Pressable
            onPress={handleConfirm}
            className="bg-accent py-4 rounded-3xl items-center active:opacity-80"
          >
            <Text style={{ fontFamily: 'Inter_700Bold' }} className="text-ink text-base">
              Confirmar {mode === 'compra' ? 'compra' : 'reserva'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
