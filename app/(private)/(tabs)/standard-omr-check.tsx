import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const StandardOmrCheck = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={[styles.container, isMobile && { padding: 12 }]}>
        <Text style={styles.header}>স্ট্যান্ডার্ড OMR চেক</Text>
        <View style={[styles.previewRow, isMobile && { flexDirection: 'column', gap: 12 }]}>
          <View style={styles.previewCard}><Text>[OMR Sheet 1]</Text></View>
          <View style={styles.previewCard}><Text>[OMR Sheet 2]</Text></View>
        </View>
        <TouchableOpacity style={styles.makeNewBtn}>
          <Text style={styles.makeNewBtnText}>Make new</Text>
        </TouchableOpacity>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Roll</Text>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={styles.tableHeaderCell}>Subject</Text>
            <Text style={styles.tableHeaderCell}>Set</Text>
            <Text style={styles.tableHeaderCell}>Result</Text>
          </View>
          {[1, 2, 3].map((row) => (
            <View style={styles.tableRow} key={row}>
              <Text style={styles.tableCell}>--</Text>
              <Text style={styles.tableCell}>--</Text>
              <Text style={styles.tableCell}>--</Text>
              <Text style={styles.tableCell}>--</Text>
              <Text style={styles.tableCell}>--</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  previewRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  previewCard: { flex: 1, backgroundColor: '#f7f7f7', borderRadius: 12, padding: 24, alignItems: 'center', marginRight: 0 },
  makeNewBtn: { backgroundColor: '#e0e7ff', borderRadius: 8, paddingVertical: 12, paddingHorizontal: 32, alignItems: 'center', alignSelf: 'center', marginBottom: 16 },
  makeNewBtnText: { fontWeight: 'bold', fontSize: 16 },
  table: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#bbb', marginTop: 8 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#e0e7ff', borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  tableHeaderCell: { flex: 1, fontWeight: 'bold', fontSize: 16, padding: 12, textAlign: 'center' },
  tableRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee' },
  tableCell: { flex: 1, fontSize: 16, padding: 12, textAlign: 'center' },
});

export default StandardOmrCheck; 