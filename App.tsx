import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from './app/(tabs)/home';
import SignUpPage from './app/(tabs)/signUp';
import StatsPage from './app/(tabs)/graph';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} options={{ title: 'Accueil' }} />
        <Stack.Screen name="Login" component={SignUpPage} options={{ title: "S'inscrire" }} />
        <Stack.Screen name="Stats" component={StatsPage} options={{ title: "Stats" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;