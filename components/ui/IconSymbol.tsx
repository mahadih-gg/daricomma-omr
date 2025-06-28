// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Define our custom icon names
type CustomIconName =
  | 'house.fill'
  | 'paperplane.fill'
  | 'chevron.left.forwardslash.chevron.right'
  | 'chevron.right'
  | 'envelope'
  | 'lock'
  | 'eye'
  | 'eye.slash'
  | 'person'
  | 'phone'
  | 'calendar'
  | 'location'
  | 'search'
  | 'close'
  | 'check'
  | 'plus'
  | 'minus'
  | 'edit'
  | 'delete'
  | 'share'
  | 'favorite'
  | 'favorite.border'
  | 'star'
  | 'star.border'
  | 'settings'
  | 'notifications'
  | 'notifications.none'
  | 'menu'
  | 'more.vert'
  | 'arrow.back'
  | 'arrow.forward'
  | 'keyboard.arrow.down'
  | 'keyboard.arrow.up'
  | 'keyboard.arrow.left'
  | 'keyboard.arrow.right';

// Map our custom names to Material Icons
const MAPPING: Record<CustomIconName, ComponentProps<typeof MaterialIcons>['name']> = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'envelope': 'email',
  'lock': 'lock',
  'eye': 'visibility',
  'eye.slash': 'visibility-off',
  'person': 'person',
  'phone': 'phone',
  'calendar': 'calendar-today',
  'location': 'location-on',
  'search': 'search',
  'close': 'close',
  'check': 'check',
  'plus': 'add',
  'minus': 'remove',
  'edit': 'edit',
  'delete': 'delete',
  'share': 'share',
  'favorite': 'favorite',
  'favorite.border': 'favorite-border',
  'star': 'star',
  'star.border': 'star-border',
  'settings': 'settings',
  'notifications': 'notifications',
  'notifications.none': 'notifications-none',
  'menu': 'menu',
  'more.vert': 'more-vert',
  'arrow.back': 'arrow-back',
  'arrow.forward': 'arrow-forward',
  'keyboard.arrow.down': 'keyboard-arrow-down',
  'keyboard.arrow.up': 'keyboard-arrow-up',
  'keyboard.arrow.left': 'keyboard-arrow-left',
  'keyboard.arrow.right': 'keyboard-arrow-right',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  onPress,
}: {
  name: CustomIconName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  onPress?: () => void;
}) {
  return (
    <MaterialIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
      onPress={onPress}
    />
  );
}
