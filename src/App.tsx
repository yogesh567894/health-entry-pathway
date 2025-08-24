import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { VitalsDemoProvider } from './context/VitalsDemoContext';
import MainNavigator from './navigation/MainNavigator';
import { colors } from './styles/colors';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <VitalsDemoProvider>
          <NavigationContainer>
            <StatusBar 
              barStyle="dark-content" 
              backgroundColor={colors.background} 
            />
            <MainNavigator />
          </NavigationContainer>
        </VitalsDemoProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;