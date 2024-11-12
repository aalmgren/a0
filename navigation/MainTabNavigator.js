import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarIcon: makeIconRender('home') }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ tabBarIcon: makeIconRender('cog') }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

function makeIconRender(name) {
  return ({ color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
  );
}

export default MainTabNavigator;
