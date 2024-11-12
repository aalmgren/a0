import React, { useContext, useEffect } from 'react';
import { View, Text } from 'react-native';
import i18n from '../i18n';
import { LanguageContext } from '../contexts/LanguageContext';

const HomeScreen = () => {    
  const { updateCounter } = useContext(LanguageContext);

  useEffect(() => {
    console.log('Re-renderizando HomeScreen devido à mudança de idioma.');
  }, [updateCounter]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{i18n.t('home')}</Text>
    </View>
  );
};

export default HomeScreen;
