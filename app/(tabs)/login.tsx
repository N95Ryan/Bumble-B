import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView"; // Make sure to import ThemedView correctly
import { ThemedText } from "@/components/ThemedText"; // Make sure to import ThemedText correctly
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  const handleGoogleLogin = () => {
    // Handle Google login logic here
  };

  const Stack = createNativeStackNavigator();
    
  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")} // Replace with the path to your logo
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
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>ou</Text>
        <View style={styles.divider} />
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Icon name="google" size={20} color="#fff" style={styles.googleIcon} />
        <Text style={styles.googleButtonText}>Se connecter avec Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          /* Handle forgot password logic */
        }}
      >
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('signUp')}
        >
        <Text style={styles.signUpButton}>
          Pas encore de compte ? Inscrivez-vous !
        </Text>
      </TouchableOpacity>
    </ThemedView>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 32,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1D3D47",
  },

  input: {
    width: "100%",
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },

  button: {
    width: "100%",
    padding: 16,
    backgroundColor: "#1D3D47",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  forgotPassword: {
    color: "#1D3D47",
    marginTop: 16,
  },

  signUpButton: {
    color: "#1D3D47",
    marginTop: 16,
  },

  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 16,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  dividerText: {
    marginHorizontal: 8,
    color: "#888",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 16,
    backgroundColor: "#C81D25",
    borderRadius: 8,
    justifyContent: "center",
  },
  googleIcon: {
    marginRight: 8,
  },
  googleButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
