import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AppHeader = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>ড্যাশবোর্ড</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontWeight: 'bold', fontSize: 24, letterSpacing: 1 },
});

export default AppHeader; 