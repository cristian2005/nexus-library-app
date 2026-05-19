import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  BackHandler,
  Platform,
  RefreshControl,
  ScrollView,
  Alert
} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NEXUS_WEB_URL, BRAND } from './config';

/**
 * Componente principal que embebe el proyecto web de Nexus en un WebView.
 *
 * Funcionalidades:
 * - Carga la URL pública configurada en config.js
 * - Barra de navegación inferior con: atrás, adelante, recargar, inicio
 * - Soporte del botón físico "atrás" de Android
 * - Indicador de progreso y pantalla de error con reintento
 * - Mantiene historial interno del WebView (canGoBack / canGoForward)
 */
export default function NexusWebView() {
  const webviewRef = useRef(null);
  const insets = useSafeAreaInsets();

  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentUrl, setCurrentUrl] = useState(NEXUS_WEB_URL);
  const [error, setError] = useState(null);

  // --- Handlers del WebView ---------------------------------------------
  const handleNavStateChange = useCallback((navState) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setCurrentUrl(navState.url);
  }, []);

  const handleLoadStart = useCallback(() => {
    setError(null);
    setIsLoading(true);
  }, []);

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
    setProgress(1);
  }, []);

  const handleError = useCallback((syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    setError({
      code: nativeEvent.code,
      description: nativeEvent.description || 'Error desconocido'
    });
    setIsLoading(false);
  }, []);

  // --- Controles de navegación -----------------------------------------
  const goBack = useCallback(() => {
    if (canGoBack && webviewRef.current) {
      webviewRef.current.goBack();
    }
  }, [canGoBack]);

  const goForward = useCallback(() => {
    if (canGoForward && webviewRef.current) {
      webviewRef.current.goForward();
    }
  }, [canGoForward]);

  const reload = useCallback(() => {
    if (webviewRef.current) {
      webviewRef.current.reload();
    }
  }, []);

  const goHome = useCallback(() => {
    if (webviewRef.current) {
      webviewRef.current.injectJavaScript('window.location.href = "' + NEXUS_WEB_URL + '"; true;');
    }
  }, []);

  // --- Botón físico "atrás" de Android ---------------------------------
  useEffect(() => {
    if (Platform.OS !== 'android') return undefined;

    const onBackPress = () => {
      if (canGoBack) {
        goBack();
        return true;
      }
      Alert.alert(
        'Salir de Nexus',
        '¿Deseas cerrar la aplicación?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Salir', onPress: () => BackHandler.exitApp() }
        ]
      );
      return true;
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [canGoBack, goBack]);

  // --- Render -----------------------------------------------------------
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Barra superior con la marca y la URL actual */}
      <View style={styles.topBar}>
        <View style={styles.brandBlock}>
          <Text style={styles.brandName}>📚 {BRAND.name}</Text>
          <Text style={styles.brandTagline} numberOfLines={1}>
            {BRAND.tagline}
          </Text>
        </View>
        <View style={styles.urlPill}>
          <Text style={styles.urlText} numberOfLines={1}>
            {currentUrl.replace(/^https?:\/\//, '')}
          </Text>
        </View>
      </View>

      {/* Barra de progreso */}
      {isLoading && (
        <View style={styles.progressWrap}>
          <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
        </View>
      )}

      {/* Zona WebView / Error */}
      <View style={styles.webviewWrap}>
        {error ? (
          <ScrollView
            contentContainerStyle={styles.errorContainer}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={reload} />
            }
          >
            <Text style={styles.errorIcon}>⚠️</Text>
            <Text style={styles.errorTitle}>No se pudo cargar la página</Text>
            <Text style={styles.errorDescription}>{error.description}</Text>
            <Text style={styles.errorCode}>Código: {error.code}</Text>

            <TouchableOpacity style={styles.retryButton} onPress={reload}>
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </TouchableOpacity>

            <Text style={styles.errorHint}>
              Desliza hacia abajo para refrescar.
            </Text>
          </ScrollView>
        ) : (
          <WebView
            ref={webviewRef}
            source={{ uri: NEXUS_WEB_URL }}
            onNavigationStateChange={handleNavStateChange}
            onLoadStart={handleLoadStart}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            onHttpError={handleError}
            onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
            startInLoadingState
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={BRAND.primary} />
                <Text style={styles.loadingText}>Cargando catálogo…</Text>
              </View>
            )}
            allowsBackForwardNavigationGestures
            javaScriptEnabled
            domStorageEnabled
            cacheEnabled
            pullToRefreshEnabled={Platform.OS === 'android'}
            originWhitelist={['https://*', 'http://*']}
            setSupportMultipleWindows={false}
          />
        )}
      </View>

      {/* Barra inferior con controles de navegación */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 8 }]}>
        <NavButton
          icon="←"
          label="Atrás"
          onPress={goBack}
          disabled={!canGoBack}
        />
        <NavButton
          icon="→"
          label="Adelante"
          onPress={goForward}
          disabled={!canGoForward}
        />
        <NavButton
          icon="↻"
          label="Recargar"
          onPress={reload}
        />
        <NavButton
          icon="⌂"
          label="Inicio"
          onPress={goHome}
        />
      </View>
    </SafeAreaView>
  );
}

// ---------------------------------------------------------------------------
// Subcomponente: botón de navegación de la barra inferior
// ---------------------------------------------------------------------------
function NavButton({ icon, label, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.navButton, disabled && styles.navButtonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.navIcon, disabled && styles.navIconDisabled]}>
        {icon}
      </Text>
      <Text style={[styles.navLabel, disabled && styles.navLabelDisabled]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

// ---------------------------------------------------------------------------
// Estilos
// ---------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BRAND.primaryDark
  },
  topBar: {
    backgroundColor: BRAND.primary,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4
  },
  brandBlock: {
    flexShrink: 0
  },
  brandName: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3
  },
  brandTagline: {
    color: '#d9e4f3',
    fontSize: 11,
    marginTop: 1
  },
  urlPill: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    maxWidth: '65%'
  },
  urlText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500'
  },
  progressWrap: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: '100%'
  },
  progressBar: {
    height: 3,
    backgroundColor: BRAND.accent
  },
  webviewWrap: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingText: {
    marginTop: 14,
    color: BRAND.textMuted,
    fontSize: 14
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: BRAND.border
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6
  },
  navButtonDisabled: {
    opacity: 0.35
  },
  navIcon: {
    fontSize: 22,
    color: BRAND.primary,
    fontWeight: '700'
  },
  navIconDisabled: {
    color: BRAND.textMuted
  },
  navLabel: {
    fontSize: 11,
    color: BRAND.text,
    marginTop: 2,
    fontWeight: '500'
  },
  navLabelDisabled: {
    color: BRAND.textMuted
  },
  errorContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    gap: 8
  },
  errorIcon: {
    fontSize: 54,
    marginBottom: 12
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: BRAND.text,
    textAlign: 'center'
  },
  errorDescription: {
    fontSize: 14,
    color: BRAND.textMuted,
    textAlign: 'center',
    marginHorizontal: 20
  },
  errorCode: {
    fontSize: 12,
    color: BRAND.textMuted,
    marginTop: 4
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: BRAND.primary,
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 10
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15
  },
  errorHint: {
    marginTop: 18,
    fontSize: 12,
    color: BRAND.textMuted
  }
});
