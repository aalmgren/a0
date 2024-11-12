import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ModulesMenuScreen from '../screens/ModulesMenuScreen';
import PickingScreen from '../screens/PickingScreen';
import ReplenishmentScreen from '../screens/ReplenishmentScreen';

const Stack = createStackNavigator();

const ModulesStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ModulesMenu" 
        component={ModulesMenuScreen} 
        options={{ title: 'Modules' }} 
      />
      <Stack.Screen 
        name="Picking" 
        component={PickingScreen} 
        options={{ title: 'Picking' }} 
      />
      <Stack.Screen 
        name="Replenishment" 
        component={ReplenishmentScreen} 
        options={{ title: 'Replenishment' }} 
      />
      {/* Adicione mais telas aqui conforme necessário */}
    </Stack.Navigator>
  );
};

export default ModulesStackNavigator;
