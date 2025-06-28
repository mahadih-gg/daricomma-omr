import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';

const Dashboard = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, isMobile && { padding: 12 }]}>
        <Text style={styles.header}>ড্যাশবোর্ড</Text>
        <TextInput style={styles.searchBar} placeholder="Search..." />
        <View style={[styles.cardsRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
          <View style={styles.card}><Text>Card 1</Text></View>
          <View style={styles.card}><Text>Card 2</Text></View>
        </View>
        <View style={styles.largeCard}><Text>Large Card (e.g. table, chart, etc.)</Text></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  searchBar: { height: 40, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', paddingHorizontal: 16, marginBottom: 20 },
  cardsRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  card: { flex: 1, backgroundColor: '#f7f7f7', borderRadius: 12, padding: 24, alignItems: 'center', marginRight: 0 },
  largeCard: { backgroundColor: '#f7f7f7', borderRadius: 12, padding: 32, alignItems: 'center' },
});

export default Dashboard;
