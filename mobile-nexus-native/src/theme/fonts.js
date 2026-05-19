import {
  useFonts as useInter,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold
} from '@expo-google-fonts/inter';
import {
  useFonts as useLora,
  Lora_400Regular,
  Lora_700Bold
} from '@expo-google-fonts/lora';

/**
 * Hook que carga las 2 fuentes Google Fonts requeridas por la rúbrica:
 *   - Inter (sans-serif) en 3 pesos
 *   - Lora (serif) en 2 pesos
 *
 * Devuelve true cuando todas están listas para renderizar.
 */
export const useAppFonts = () => {
  const [interLoaded] = useInter({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });
  const [loraLoaded] = useLora({
    Lora_400Regular,
    Lora_700Bold
  });

  return interLoaded && loraLoaded;
};
