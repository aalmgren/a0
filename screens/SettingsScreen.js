import React from 'react';
import { View } from 'react-native';
import ThemeSwitch from '../components/ThemeSwitch';

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemeSwitch />
    </View>
  );
};

export default SettingsScreen;
