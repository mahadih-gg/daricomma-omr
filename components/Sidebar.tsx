import ZoneIcon from '@/components/icons/zone.icon';
import { UserRole } from '@/enums/auth.enum';
import { useAuth } from '@/store/authStore';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import HomeIcon from './icons/home.icon';
import RewardIcon from './icons/reward.icon';
import TrophyIcon from './icons/trophy.icon';

interface SidebarProps {
  routes: { name: string; title: string }[];
  showProfileMenu?: boolean;
}

export default function Sidebar({ routes, showProfileMenu = false }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, isLoggedIn } = useAuth();

  const getIcon = (routeName: string, isActive: boolean) => {
    const color = isActive ? '#2D5AC8' : '#656565';

    switch (routeName) {
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
      default:
        return null;
    }
  };

  const handleNavigation = (routeName: string) => {
    switch (routeName) {
      case 'index':
        router.push('/');
        break;
      case 'zone':
        router.push('/(private)/(tabs)/zone' as any);
        break;
      case 'teams':
        router.push('/(private)/(tabs)/teams' as any);
        break;
      case 'rewards':
        router.push('/(private)/(tabs)/rewards' as any);
        break;
      case 'classes':
        router.push('/(private)/(tabs)/classes' as any);
        break;
      default:
        router.push('/' as any);
    }
  };

  const isRouteActive = (routeName: string) => {
    if (routeName === 'index') {
      return pathname === '/' || pathname === '/index';
    }
    return pathname.includes(`/${routeName}`);
  };

  return (
    <View style={styles.sidebar}>
      <View style={styles.header}>
        <Text style={styles.logo}>OMR</Text>
        {showProfileMenu && isLoggedIn && (
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {currentUser?.firstName} {currentUser?.lastName}
            </Text>
            <Text style={styles.userRole}>
              {currentUser?.role?.toLowerCase()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.navigation}>
        {routes.map((route) => {
          // Filter classes route for non-teachers
          if (route.name === 'classes' && currentUser?.role !== UserRole.TEACHER) {
            return null;
          }

          const isActive = isRouteActive(route.name);

          return (
            <Pressable
              key={route.name}
              style={[styles.navItem, isActive && styles.activeNavItem]}
              onPress={() => handleNavigation(route.name)}
            >
              {getIcon(route.name, isActive)}
              <Text style={[
                styles.navText,
                { color: isActive ? '#2D5AC8' : '#656565' }
              ]}>
                {route.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 250,
    backgroundColor: '#ffffff',
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 32,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5AC8',
    marginBottom: 12,
  },
  userInfo: {
    marginTop: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  userRole: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
    marginTop: 2,
  },
  navigation: {
    flex: 1,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
  },
  activeNavItem: {
    backgroundColor: '#F0F6FE',
    borderWidth: 1,
    borderColor: '#2D5AC8',
  },
  navText: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
}); 