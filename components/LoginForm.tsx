import { Link } from "expo-router";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
  } from "react-native";
  import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon
  
  export const LoginForm = () => {
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
          <Text style={styles.loginButtonText}>Connexion</Text>
        </View>        
        <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>ou</Text>
        <View style={styles.divider} />
      </View>
        <View style={styles.googleButton}>
          <Icon name="google" size={20} color="#fff" style={styles.googleIcon} />
          <Text style={styles.googleButtonText}>Se connecter avec Google</Text>
        </View>
        <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        <Link href="/signUp" style={styles.loginLink}>Pas encore de compte ? S'inscrire</Link>
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
      fontWeight: "normal",
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
      borderRadius: 24,
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
  