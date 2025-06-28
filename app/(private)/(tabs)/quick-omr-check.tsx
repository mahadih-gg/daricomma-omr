import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const QuickOmrCheck = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, isMobile && { padding: 12 }]}>
        <Text style={styles.header}>কুইক OMR চেক</Text>
        <View style={[styles.cardsRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
          <View style={styles.card}><Text>Upload answers sheet</Text></View>
          <View style={styles.card}><Text>Batch upload students answers sheet</Text></View>
        </View>
        <TouchableOpacity style={styles.quickCheckBtn}>
          <Text style={styles.quickCheckBtnText}>Quick Check</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  cardsRow: { flexDirection: 'row', gap: 16, marginBottom: 24 },
  card: { flex: 1, backgroundColor: '#f7f7f7', borderRadius: 12, padding: 32, alignItems: 'center', marginRight: 0 },
  quickCheckBtn: { backgroundColor: '#e0e7ff', borderRadius: 8, paddingVertical: 16, paddingHorizontal: 32, alignItems: 'center', alignSelf: 'center' },
  quickCheckBtnText: { fontWeight: 'bold', fontSize: 18 },
});

export default QuickOmrCheck; 