import { Ionicons } from '@expo/vector-icons';
import React from 'react';

export default function RewardIcon({ color = '#656565', size = 24 }: { color?: string; size?: number }) {
  return <Ionicons name="gift" size={size} color={color} />;
} 