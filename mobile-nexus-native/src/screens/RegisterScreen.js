import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

/**
 * TODO COMPA: Implementa el registro con Firebase Auth.
 *
 * Patrón a seguir (ver LoginScreen.js como referencia):
 *   - 3 TextInput: email, password, confirmar password
 *   - Validación: passwords coinciden, email no vacío
 *   - Botón "Crear cuenta" → llama a useAuth().signUp(email, password, displayName)
 *     (displayName puedes pedirlo como un cuarto campo opcional)
 *   - Tras éxito: el AuthProvider detecta el nuevo user automáticamente
 *     y RootNavigator conmuta al stack privado. No hace falta navigation.navigate.
 *   - Mapear errores de Firebase: 'auth/email-already-in-use', 'auth/weak-password',
 *     'auth/invalid-email' (mira LoginScreen.errorMessage como guía).
 *
 * Borra este placeholder cuando tengas la pantalla real.
 */
export default function RegisterScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.emoji}>🚧</Text>
        <Text style={styles.title}>Pantalla en construcción</Text>
        <Text style={styles.text}>
          El registro lo implementa el compañero de equipo.
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>Volver al login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surfaceAlt },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emoji: { fontSize: 56 },
  title: { fontSize: 20, fontWeight: '700', color: colors.ink, marginTop: 14 },
  text: { fontSize: 14, color: colors.muted, textAlign: 'center', marginTop: 8 },
  btn: {
    marginTop: 28,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: 22,
    paddingVertical: 12,
  },
  btnText: { color: '#fff', fontWeight: '700' },
});
