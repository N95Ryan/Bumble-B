import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

const NotFoundSplashScreen: React.FC = () => {
  const router = useRouter();
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const redirect = async () => {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Délai de 3 secondes

      // Cache le splash screen natif avec une animation d'opacité
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500, // Durée de l'animation en ms
        useNativeDriver: true,
      }).start(async () => {
        await SplashScreen.hideAsync();
        router.replace('/login'); // Redirection vers la page de connexion
      });
    };

    redirect();
  }, [opacity, router]);

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Image source={require('../assets/images/splash.png')} style={styles.image} />
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
  }
});

export default NotFoundSplashScreen;
