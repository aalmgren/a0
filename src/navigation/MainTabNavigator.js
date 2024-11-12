import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ModulesStackNavigator from './ModulesStackNavigator';
import { ThemeContext } from '../contexts/ThemeContext';
import i18n from '../i18n';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: i18n.t('home'),
            tabBarIcon: makeIconRender('home')
          }}
        />
        <Tab.Screen
          name="Modules"
          component={ModulesStackNavigator}
          options={{
            tabBarLabel: i18n.t('modules'),
            tabBarIcon: makeIconRender('cube')
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: i18n.t('settings'),
            tabBarIcon: makeIconRender('cog')
          }}
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
