import { useColorScheme } from '@/hooks/useColorScheme';
import { QueryProvider } from '@/providers/QueryProvider';
import { StoreProvider } from '@/providers/StoreProvider';
import { useAuth } from '@/store/authStore';
import tamaguiConfig from '@/tamagui.config';
import { NotoSansBengali_100Thin } from '@expo-google-fonts/noto-sans-bengali/100Thin';
import { NotoSansBengali_200ExtraLight } from '@expo-google-fonts/noto-sans-bengali/200ExtraLight';
import { NotoSansBengali_300Light } from '@expo-google-fonts/noto-sans-bengali/300Light';
import { NotoSansBengali_400Regular } from '@expo-google-fonts/noto-sans-bengali/400Regular';
import { NotoSansBengali_500Medium } from '@expo-google-fonts/noto-sans-bengali/500Medium';
import { NotoSansBengali_600SemiBold } from '@expo-google-fonts/noto-sans-bengali/600SemiBold';
import { NotoSansBengali_700Bold } from '@expo-google-fonts/noto-sans-bengali/700Bold';
import { NotoSansBengali_800ExtraBold } from '@expo-google-fonts/noto-sans-bengali/800ExtraBold';
import { NotoSansBengali_900Black } from '@expo-google-fonts/noto-sans-bengali/900Black';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import Head from "expo-router/head";
import { StatusBar } from 'expo-status-bar';
import { ReactNode, useEffect } from 'react';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { TamaguiProvider } from 'tamagui';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  let [fontsLoaded, fontError] = useFonts({
    NotoSansBengali_100Thin,
    NotoSansBengali_200ExtraLight,
    NotoSansBengali_300Light,
    NotoSansBengali_400Regular,
    NotoSansBengali_500Medium,
    NotoSansBengali_600SemiBold,
    NotoSansBengali_700Bold,
    NotoSansBengali_800ExtraBold,
    NotoSansBengali_900Black
  });

  // Simplified web font handling - moved before conditional return
  useEffect(() => {
    if (Platform.OS === "web") {
      const linkId = "google-font-noto-sans";
      if (!document.getElementById(linkId)) {
        const link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        link.href =
          "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap";
        document.head.appendChild(link);
      }
    }
  }, []);

  const AppContent = ({ children }: { children: ReactNode }) => {
    const { isLoadingUser } = useAuth();

    useEffect(() => {
      if ((fontsLoaded || fontError) && !isLoadingUser) {
        setTimeout(async () => {
          await SplashScreen.hideAsync();
        }, 100);
      }
    }, [fontsLoaded, fontError, isLoadingUser]);

    return <>{children}</>;
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {Platform.OS === "web" && (
        <Head>
          <title>Daricomma OMR</title>
          {/* Add this meta tag to force light mode on web */}
          <meta name="color-scheme" content="light" />
        </Head>
      )}
      <QueryProvider>
        <StoreProvider>
          <TamaguiProvider config={tamaguiConfig}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <AppContent>
                <Stack>
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <StatusBar style="auto" />
              </AppContent>
            </ThemeProvider>
          </TamaguiProvider>
        </StoreProvider>
      </QueryProvider>
    </GestureHandlerRootView>
  );
}
