import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { HeaderBlock } from '@/components/HeaderBlock';
import { LoginForm } from '@/components/LoginForm';

const LoginScreen: React.FC = () => {
  useEffect(() => {
    // Vous pouvez éventuellement cacher le splash screen ici, bien que cela dépende de votre conception spécifique
  }, []);

  return (
    <View style={styles.container}>
      <HeaderBlock />
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
