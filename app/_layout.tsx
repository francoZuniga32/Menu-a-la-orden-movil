import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    Copyduck: require('@/assets/fonts/Copyduck.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="registrar" options={{ title: 'Crear cuenta' }} />
        <Stack.Screen name="dashboard" options={{ title: 'Mis menús' }} />
        <Stack.Screen name="crear" options={{ title: 'Crear menú' }} />
        <Stack.Screen name="edit/[id]" options={{ title: 'Editar menú' }} />
        <Stack.Screen name="vermenu/[id]" options={{ title: 'Menú' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
