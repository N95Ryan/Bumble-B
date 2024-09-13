import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initWebSocket } from '@/src/js/websocket';


// Importation des composants des écrans de l'application
import BumbleSplash from './BumbleSplash';
import HomePage from './(tabs)/home';
import SignUpPage from './(tabs)/signUp';

// Création d'un stack navigator pour gérer la navigation entre les écrans
const Stack = createNativeStackNavigator();

// Définition du composant principal de l'application
function App() {
    React.useEffect(() => {
    initWebSocket();
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={BumbleSplash} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
initWebSocket();

export default App;
