import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface DividerProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  style?: any;
}

export function Divider({
  color = '#E5E7EB',
  thickness = 1,
  marginVertical = 8,
  marginHorizontal = 0,
  style,
}: DividerProps) {
  return (
    <View
      style={[
        styles.divider,
        {
          backgroundColor: color,
          height: thickness,
          marginVertical,
          marginHorizontal,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
}); 