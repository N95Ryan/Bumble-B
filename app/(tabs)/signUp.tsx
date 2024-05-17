import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { ThemedView } from "@/components/ThemedView"; // Assurez-vous d'importer correctement ThemedView
import { ThemedText } from "@/components/ThemedText"; // Assurez-vous d'importer correctement ThemedText
import Icon from "react-native-vector-icons/FontAwesome"; // Importer l'icône de FontAwesome


export default function SignUpScreen() {

    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {};

  const handleGoogleSignUp = () => {
    // Handle Google sign up logic here
  };

    return (
        <ThemedView style={styles.container}>
          <Image
            source={require("@/assets/images/logo.png")} // Remplacez par le chemin de votre logo
            style={styles.logo}
          />
      <ThemedText type="title" style={styles.title}>
        Inscription 🐝
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
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>S'inscrire</Text>
          </TouchableOpacity>
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.divider} />
          </View>
          <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
            <Icon name="google" size={20} color="#fff" style={styles.googleIcon} />
            <Text style={styles.googleButtonText}>S'inscrire avec Google</Text>
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
      backgroundColor: "#fff", // Vous pouvez ajuster cette couleur selon le thème
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
      backgroundColor: "#1D3D47", // Vous pouvez ajuster cette couleur selon le thème
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
      color: "#1D3D47", // Vous pouvez ajuster cette couleur selon le thème
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
      backgroundColor: "#C81D25", // Couleur du bouton Google
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
  