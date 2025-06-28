import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const StudentDatabase = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>স্টুডেন্ট ডাটাবেজ</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderCell}>Roll</Text>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={styles.tableHeaderCell}>Class</Text>
            <Text style={styles.tableHeaderCell}>Section</Text>
          </View>
          {[1, 2, 3].map((row) => (
            <View style={styles.tableRow} key={row}>
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
  table: { backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#bbb', marginTop: 8 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#e0e7ff', borderTopLeftRadius: 12, borderTopRightRadius: 12 },
  tableHeaderCell: { flex: 1, fontWeight: 'bold', fontSize: 16, padding: 12, textAlign: 'center' },
  tableRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#eee' },
  tableCell: { flex: 1, fontSize: 16, padding: 12, textAlign: 'center' },
});

export default StudentDatabase; 