import React, { useState } from 'react';
import { TextInput, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={styles.logo}
      />
      <ThemedText type="title" style={styles.title}>
        Bienvenue sur Bumble B ! 🐝 
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Adresse e-mail"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: "#1f1f1f",
  },

  input: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },

  button: {
    width: '100%',
    padding: 16,
    backgroundColor: '#ffbf00',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },

  buttonText: {
    color: '#1f1f1f',
    fontWeight: 'bold',
    fontSize: 16,
  },

  forgotPassword: {
    color: '#1f1f1f',
    marginTop: 16,
  },
  
});
