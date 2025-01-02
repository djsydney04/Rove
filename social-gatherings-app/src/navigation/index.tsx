import React, { useState } from 'react';
import { TouchableOpacity, StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ActivityDiscovery from '../screens/ActivityDiscovery';
import MyActivities from '../screens/MyActivities';
import CreateActivity from '../screens/CreateActivity';
import Profile from '../screens/Profile';
import Preferences from '../screens/Preferences';
import SplashScreen from '../screens/SplashScreen';
import CustomTabBar from '../components/CustomTabBar';
import ActivityDetails from '../screens/ActivityDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="MyActivities" 
        component={MyActivities}
        options={{
          title: 'My Activities',
        }}
      />
      <Tab.Screen 
        name="ActivityDiscovery" 
        component={ActivityDiscovery}
        options={{
          title: 'Discover',
        }}
      />
      <Tab.Screen 
        name="CreateActivity" 
        component={CreateActivity}
        options={{
          title: 'Create',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen 
        name="Preferences" 
        component={Preferences}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'card',
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Root" component={TabNavigator} />
        <Stack.Screen 
          name="ActivityDetails" 
          component={ActivityDetails}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
      <View style={{ height: 10, backgroundColor: '#000000', position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </NavigationContainer>
  );
}
