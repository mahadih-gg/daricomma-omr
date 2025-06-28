import { useAuth } from '@/store/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  const { isLoggedIn, isLoadingUser } = useAuth();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      try {
        // Check if user has a token
        const token = await AsyncStorage.getItem('accessToken');

        if (token && isLoggedIn) {
          // User is authenticated, go to dashboard
          router.replace('/(private)/(tabs)');
        } else {
          // No token or not logged in, go to login
          router.replace('/(auth)/login');
        }
      } catch (error) {
        // Error occurred, go to login
        router.replace('/(auth)/login');
      }
    };

    // Only redirect when we're not loading user data
    if (!isLoadingUser) {
      checkAuthAndRedirect();
    }
  }, [isLoggedIn, isLoadingUser]);

  // Show nothing while determining route
  return null;
} 