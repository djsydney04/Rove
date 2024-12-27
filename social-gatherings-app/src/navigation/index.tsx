import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ActivityDiscovery from '../screens/ActivityDiscovery';
import MyActivities from '../screens/MyActivities';
import CreateActivity from '../screens/CreateActivity';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Discover':
                iconName = focused ? 'flash' : 'flash-outline';
                break;
              case 'My Activities':
                iconName = focused ? 'bookmark' : 'bookmark-outline';
                break;
              case 'Create':
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'help-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Discover" component={ActivityDiscovery} />
        <Tab.Screen name="My Activities" component={MyActivities} />
        <Tab.Screen name="Create" component={CreateActivity} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
