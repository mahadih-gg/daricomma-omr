import { Stack, Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeIcon from '@/components/icons/home.icon';
import RewardIcon from '@/components/icons/reward.icon';
import TrophyIcon from '@/components/icons/trophy.icon';
import ZoneIcon from '@/components/icons/zone.icon';
import { UserRole } from '@/enums/auth.enum';
import { useAuth } from '@/store/authStore';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/HapticTab';
import Sidebar from '@/components/Sidebar';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const WEB_BREAKPOINT = 768;

const getRoutes = (role: UserRole | undefined) => [
  { name: 'index', title: 'Home' },
  { name: 'zone', title: 'The Zone' },
  { name: 'teams', title: 'My Teams' },
  { name: 'rewards', title: 'Rewards' },
  ...(role === UserRole.TEACHER ? [{ name: 'classes', title: 'Classes' }] : []),
];

function CustomTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const insets = useSafeAreaInsets();
  const { currentUser } = useAuth();

  // Filter routes based on user role
  const visibleRoutes = state.routes.filter((route: any) => {
    // If it's the classes route, only show it for teachers
    if (route.name === 'classes') {
      return currentUser?.role === UserRole.TEACHER;
    }
    // Show all other routes to everyone
    return true;
  });

  return (
    <View
      style={[
        styles.tabBar,
        {
          backgroundColor: '#ffffff',
          borderTopColor: '#e0e0e0',
          paddingBottom: insets.bottom,
        },
      ]}
    >
      {visibleRoutes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused =
          state.index ===
          visibleRoutes.findIndex((r: any) => r.key === route.key);

        const getIcon = () => {
          const color = isFocused ? '#2D5AC8' : '#656565';
          switch (route.name) {
            case 'index':
              return <HomeIcon color={color} />;
            case 'zone':
              return <ZoneIcon color={color} />;
            case 'teams':
              return <TrophyIcon color={color} />;
            case 'rewards':
              return <RewardIcon color={color} />;
            case 'classes':
              return <Ionicons name="school" size={24} color={color} />;
            case 'explore':
              return <IconSymbol size={28} name="paperplane.fill" color={color} />;
            default:
              return <IconSymbol size={28} name="house.fill" color={color} />;
          }
        };

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={[styles.tabItem, isFocused && styles.activeTab]}
          >
            {getIcon()}
            <Text
              style={[
                styles.tabText,
                {
                  color: isFocused ? '#2D5AC8' : '#656565',
                  fontWeight: '500',
                },
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { currentUser } = useAuth();
  const { width } = useWindowDimensions();
  const [isWebLayout, setIsWebLayout] = useState(false);

  // Get routes based on user role
  const routes = getRoutes(currentUser?.role);

  // Update layout mode based on screen width and platform
  useEffect(() => {
    setIsWebLayout(Platform.OS === 'web' && width >= WEB_BREAKPOINT);
  }, [width]);

  // For web layout with sidebar - using Stack instead of Tabs
  if (isWebLayout) {
    return (
      <View style={styles.webWrapper}>
        <View style={styles.webContainer}>
          <Sidebar routes={routes} showProfileMenu={true} />
          <View style={styles.webContent}>
            <Stack>
              <Stack.Screen
                name="index"
                options={{
                  title: 'Home',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="explore"
                options={{
                  title: 'Explore',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="zone"
                options={{
                  title: 'The Zone',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="teams"
                options={{
                  title: 'My Teams',
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="rewards"
                options={{
                  title: 'Rewards',
                  headerShown: false,
                }}
              />
              {currentUser?.role === UserRole.TEACHER && (
                <Stack.Screen
                  name="classes"
                  options={{
                    title: 'Classes',
                    headerShown: false,
                  }}
                />
              )}
            </Stack>
          </View>
        </View>
      </View>
    );
  }

  // For mobile layout with bottom tabs
  return (
    <View style={styles.container}>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen name="zone" options={{ href: null }} />
        <Tabs.Screen name="teams" options={{ href: null }} />
        <Tabs.Screen name="rewards" options={{ href: null }} />
        <Tabs.Screen name="classes" options={{ href: null }} />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  webContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  webContent: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2.2,
    borderColor: 'transparent',
    borderRadius: 15,
    paddingVertical: 4,
    marginHorizontal: 5,
    marginBottom: 8,
  },
  activeTab: {
    backgroundColor: '#F0F6FE',
    borderColor: '#2D5AC8',
  },
  tabText: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
});
