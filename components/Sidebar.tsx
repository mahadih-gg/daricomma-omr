import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const navItems = [
  { label: 'ড্যাশবোর্ড', path: '' },
  { label: 'OMR ডাউনলোড', path: 'explore' },
  { label: 'কুইক OMR চেক', path: 'quick-omr-check' },
  { label: 'স্ট্যান্ডার্ড OMR চেক', path: 'standard-omr-check' },
  { label: 'স্টুডেন্ট ডাটাবেজ', path: 'student-database' },
  { label: 'প্যাকেজ', path: 'package' },
  { label: 'নির্দেশিকা', path: 'instructions' },
  { label: 'ভিডিও টিউটোরিয়াল', path: 'video-tutorial' },
];

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>DariComma</Text>
      <View style={styles.navList}>
        {navItems.map(item => (
          <TouchableOpacity
            key={item.path}
            style={[
              styles.navItem,
              (pathname === `/${item.path}` || (item.path === '' && pathname === '/')) && styles.activeNavItem
            ]}
            onPress={() => {
              router.push(item.path);
              if (onClose) onClose();
            }}
          >
            <Text style={[
              styles.navText,
              (pathname === `/${item.path}` || (item.path === '' && pathname === '/')) && styles.activeNavText
            ]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.footer}>
        <Text style={styles.logoutText}>লগ-আউট</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 24, paddingBottom: 16, paddingHorizontal: 0, justifyContent: 'space-between' },
  logo: { paddingHorizontal: 16, fontWeight: 'bold', fontFamily: 'monospace', fontSize: 20, marginBottom: 16 },
  navList: { flex: 1 },
  navItem: { paddingVertical: 12, paddingHorizontal: 24 },
  activeNavItem: { backgroundColor: '#e0e7ff' },
  navText: { fontSize: 18 },
  activeNavText: { fontWeight: 'bold' },
  footer: { borderTopWidth: 1, borderTopColor: '#eee', padding: 16 },
  logoutText: { fontSize: 16, color: '#888' },
});

export default Sidebar; 