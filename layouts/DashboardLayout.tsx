import React from 'react';
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import Sidebar from '../components/Sidebar';

const sidebarLinks = [
  'ড্যাশবোর্ড',
  'OMR ডাউনলোড',
  'কুইক OMR চেক',
  'স্ট্যান্ডার্ড OMR চেক',
  'স্টুডেন্ট ডাটাবেজ',
  'প্যাকেজ',
  'নির্দেশিকা',
  'ভিডিও টিউটোরিয়াল',
];

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  minHeight: '100vh',
};

const sidebarStyle: React.CSSProperties = {
  width: 260,
  minWidth: 200,
  background: '#f8f9fa',
  borderRight: '1px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column',
};

const mainStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  background: '#fff',
};

const headerStyle: React.CSSProperties = {
  height: 64,
  borderBottom: '1px solid #e0e0e0',
  display: 'flex',
  alignItems: 'center',
  padding: '0 24px',
  background: '#fff',
  zIndex: 10,
};

// Simple responsive logic
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 900);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['top', 'left', 'right']}>
      <View style={styles.layout}>
        {/* Sidebar */}
        {isMobile ? (
          sidebarOpen && (
            <View style={styles.sidebarOverlay}>
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </View>
          )
        ) : (
          <View style={styles.sidebar}>
            <Sidebar />
          </View>
        )}
        {/* Main content */}
        <View style={styles.main}>
          <View style={styles.header}>
            {isMobile && (
              <TouchableOpacity onPress={() => setSidebarOpen(!sidebarOpen)} style={styles.menuButton}>
                {/* Hamburger icon */}
                <View style={styles.menuBar} />
                <View style={styles.menuBar} />
                <View style={styles.menuBar} />
              </TouchableOpacity>
            )}
            <AppHeader />
          </View>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  layout: { flex: 1, flexDirection: 'row', minHeight: '100%' },
  sidebar: { width: 260, minWidth: 200, backgroundColor: '#f8f9fa', borderRightWidth: 1, borderRightColor: '#e0e0e0' },
  sidebarOverlay: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, backgroundColor: '#f8f9fa', zIndex: 100, borderRightWidth: 1, borderRightColor: '#e0e0e0', elevation: 8 },
  main: { flex: 1, backgroundColor: '#fff' },
  header: { height: 64, borderBottomWidth: 1, borderBottomColor: '#e0e0e0', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, backgroundColor: '#fff', zIndex: 10 },
  content: { flex: 1, padding: 24 },
  menuButton: { marginRight: 16, justifyContent: 'center', alignItems: 'center', width: 36, height: 36 },
  menuBar: { width: 24, height: 3, backgroundColor: '#333', marginVertical: 2 },
});

export default DashboardLayout;
