import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { ThemedView } from '@/components/ThemedView'; // Correct import for ThemedView
import { ThemedText } from '@/components/ThemedText'; // Correct import for ThemedText, if applicable

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')} // Your logo image
        style={styles.logo}
      />
      <ThemedText type="title" style={styles.title}>
        Bienvenue !
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
      <TouchableOpacity onPress={() => {/* Handle forgot password logic */}}>
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
    backgroundColor: '#fff', // You can adjust this according to the theme
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
    color : "#1D3D47"
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
    backgroundColor: '#1D3D47', // You can adjust this according to the theme
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#1D3D47', // You can adjust this according to the theme
    marginTop: 16,
  },
});
