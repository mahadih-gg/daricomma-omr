import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const InstructionsPage = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>নির্দেশিকা</Text>
        <View style={styles.card}>
          <Text>Instructions or guidelines will be shown here.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  card: { backgroundColor: '#f7f7f7', borderRadius: 12, padding: 32, alignItems: 'center' },
});

export default InstructionsPage; 