import React, { useState } from 'react';
import { TouchableOpacity, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ActivityDiscovery from '../screens/ActivityDiscovery';
import MyActivities from '../screens/MyActivities';
import CreateActivity from '../screens/CreateActivity';
import Profile from '../screens/Profile';
import Preferences from '../screens/Preferences';
import SplashScreen from '../screens/SplashScreen';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        screenOptions={({ route, navigation }) => ({
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: '#000000',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 17,
            color: '#FFFFFF',
          },
          headerTintColor: '#FFFFFF',
          tabBarShowLabel: false,
          // Add header options for Discover screen
          ...(route.name === 'Discover' && {
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Preferences')}
                style={{ marginLeft: 16 }}
              >
                <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="person-outline" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            ),
          }),
        })}
      >
        <Tab.Screen 
          name="My Activities" 
          component={MyActivities}
          options={{
            headerTitle: 'My Activities',
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: '700',
              color: '#FFFFFF',
            }
          }}
        />
        <Tab.Screen 
          name="Discover" 
          component={ActivityDiscovery}
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen 
          name="Create" 
          component={CreateActivity}
          options={{
            headerTitle: 'Create Activity',
            presentation: 'modal'
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={Profile}
          options={{
            tabBarButton: () => null,
            headerShown: true,
          }}
        />
        <Tab.Screen 
          name="Preferences" 
          component={Preferences}
          options={{
            tabBarButton: () => null,
            headerShown: true,
          }}
        />
      </Tab.Navigator>
      <View style={{ height: 10, backgroundColor: '#000000', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </NavigationContainer>
  );
}
