import React from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import RectangleStack from '../../assets/icons/rectangle.stack.svg';
import Bookmark from '../../assets/icons/bookmark.svg';
import Plus from '../../assets/icons/plus.svg';

const ICON_SIZE = 25;
const ACTIVE_COLOR = '#000000';
const INACTIVE_COLOR = '#666666';

export default function BottomNavBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const iconScale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(iconScale, {
      toValue: 1.1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(iconScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const renderIcon = (routeName: string, isFocused: boolean) => {
    const color = isFocused ? ACTIVE_COLOR : INACTIVE_COLOR;
    const iconStyle = { width: ICON_SIZE, height: ICON_SIZE };

    switch (routeName) {
      case 'Discover':
        return (
          <View style={iconStyle}>
            <Bookmark width="100%" height="100%" fill={color} />
          </View>
        );
      case 'Swipe':
        return (
          <View style={[iconStyle, { transform: [{ rotate: '90deg' }] }]}>
            <RectangleStack width="100%" height="100%" fill={color} />
          </View>
        );
      case 'CreateActivity':
        return (
          <View style={iconStyle}>
            <Plus width="100%" height="100%" fill={color} />
          </View>
        );
      default:
        return (
          <View style={iconStyle}>
            <Bookmark width="100%" height="100%" fill={color} />
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={styles.tab}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                isFocused && styles.activeIconContainer,
                { transform: [{ scale: iconScale }] },
              ]}
            >
              {renderIcon(route.name, isFocused)}
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 80,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 8,
    width: ICON_SIZE + 16,
    height: ICON_SIZE + 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#F5F5F5',
  },
});
