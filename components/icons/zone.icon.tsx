import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function ZoneIcon({ color = '#656565', size = 24 }: { color?: string; size?: number }) {
  return <Ionicons name="location" size={size} color={color} />;
} 