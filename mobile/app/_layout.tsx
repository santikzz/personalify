import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { MD3LightTheme, PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';
import '../global.css';
import { GlobalProvider } from '@/context/GlobalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = {
    ...MD3LightTheme,
    // roundness: 2,
    colores: {
      ...MD3LightTheme.colors,
    },
  };

  const queryClient = new QueryClient();

  return (
    // <ThemeProvider value={DefaultTheme}>
    <PaperProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="employee/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style='dark' backgroundColor='#ffffff' />
        </GlobalProvider>
      </QueryClientProvider>
    </PaperProvider>
    // </ThemeProvider>
  );
}
