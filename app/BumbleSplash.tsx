// app/BumbleSplash.tsx
import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

const BumbleSplash: React.FC = () => {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const showSplashScreen = async () => {
      await SplashScreen.preventAutoHideAsync(); // Empêche le splash screen de se cacher automatiquement
      await new Promise(resolve => setTimeout(resolve, 3000)); // Délai de 3 secondes

      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(async () => {
        await SplashScreen.hideAsync();
        router.replace('/home'); // Redirection vers la page de connexion
      });
    };

    showSplashScreen();
  }, [opacity, router]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image source={require('../assets/images/Splash screen.png')} style={styles.image} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
});

export default BumbleSplash;
