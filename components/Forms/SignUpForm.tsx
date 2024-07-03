import { Link } from "expo-router";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
  } from "react-native";
  
  export const SignUpForm = () => {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#94A3B8"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#94A3B8"
          secureTextEntry
        />
        <View style={styles.loginButton}>
          <Text style={styles.loginButtonText}>S'inscrire</Text>
        </View>        
        <Link href="/home" style={styles.loginLink}>Vous avez déjà un compte ? Connexion</Link>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  
    input: {
      width: "100%",
      padding: 16,
      marginVertical: 8,
      borderRadius: 24,
      backgroundColor: "#F1F5F9",
      fontSize: 16,
      fontWeight: "500",

    },
  
    loginButton: {
      width: "100%",
      padding: 16,
      backgroundColor: "#FDE047",
      borderRadius: 24,
      alignItems: "center",
      marginVertical: 8,
    },

    loginButtonText: {
      color: "#713F12",
      fontWeight: "bold",
      fontSize: 16,
    },
      
    forgotPassword: {
        fontSize: 16,
        marginTop: 8,
        color: "#94A3B8",
      },

    loginLink: {
        fontSize: 16,
        marginTop: 8,
        color: "#94A3B8",
      }
  });
  