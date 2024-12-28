import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const handleCreatePress = () => {
    // Reset to initial screen if already on Create
    if (state.routes[state.index].name === 'Create') {
      navigation.setParams({ showForm: false });
    } else {
      // Navigate to Create screen
      navigation.navigate('Create');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          // Hide Profile and Preferences from tab bar
          if (route.name === 'Profile' || route.name === 'Preferences') {
            return null;
          }

          let iconName;
          switch (route.name) {
            case 'My Activities':
              iconName = isFocused ? 'bookmark' : 'bookmark-outline';
              break;
            case 'Discover':
              iconName = isFocused ? 'flash' : 'flash-outline';
              break;
            case 'Create':
              iconName = 'add';
              break;
            default:
              iconName = 'help';
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => route.name === 'Create' ? handleCreatePress() : navigation.navigate(route.name)}
              style={[styles.tab, isFocused && styles.focusedTab]}
            >
              <View style={styles.iconContainer}>
                <Ionicons
                  name={iconName}
                  size={24}
                  color="#FFFFFF"
                  style={[
                    styles.icon,
                    isFocused && styles.focusedIcon
                  ]}
                />
                {isFocused && <View style={styles.indicator} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.bottomShadow} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#000000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
  },
  bottomShadow: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: '#000000',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  focusedTab: {
    transform: [{scale: 1.1}],
  },
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    opacity: 0.7,
  },
  focusedIcon: {
    opacity: 1,
  },
  indicator: {
    position: 'absolute',
    bottom: -8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
});
