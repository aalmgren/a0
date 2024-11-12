import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { ThemeContext } from '../contexts/ThemeContext';
import { LanguageContext } from '../contexts/LanguageContext';
import i18n from '../i18n';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  const { updateCounter } = useContext(LanguageContext);

  useEffect(() => {
    console.log('Re-renderizando MainTabNavigator devido à mudança de idioma.');
  }, [updateCounter]);

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
