import { IconSymbol } from '@/components/ui/IconSymbol';
import React from 'react';

export default function HomeIcon({ color = '#656565', size = 24 }: { color?: string; size?: number }) {
  return <IconSymbol name="house.fill" color={color} size={size} />;
} 