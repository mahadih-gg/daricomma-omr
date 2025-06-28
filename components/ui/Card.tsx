import React from 'react';
import { StyleSheet, View } from 'react-native';

export interface CardProps {
  children: React.ReactNode;
  padding?: number;
  margin?: number;
  backgroundColor?: string;
  borderRadius?: number;
  shadow?: boolean;
  style?: any;
}

export function Card({
  children,
  padding = 16,
  margin = 0,
  backgroundColor = 'white',
  borderRadius = 12,
  shadow = true,
  style,
}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          padding,
          margin,
          backgroundColor,
          borderRadius,
          ...(shadow && styles.shadow),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 