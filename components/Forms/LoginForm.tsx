import { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { authentification } from "../../services/userServices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons"; // Import de Ionicons pour les icônes

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour la visibilité du mot de passe

  const router = useRouter();

  const validateForm = () => {
    const isValid = username.trim() !== "" && password.trim() !== "";
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [username, password]);

  const handleLogin = async () => {
    if (!isFormValid) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await authentification(username, password);

      if (response && response.token) {
        await AsyncStorage.setItem("jwt_token", response.token);
        Alert.alert("Succès", "Connexion réussie !");

        const token = await AsyncStorage.getItem("jwt_token");

        router.push("/dashboard");
      } else {
        Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      Alert.alert("Erreur", "Une erreur est survenue, veuillez réessayer.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        placeholderTextColor="#94A3B8"
        onChangeText={setUsername}
        value={username}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Mot de passe"
          placeholderTextColor="#94A3B8"
          secureTextEntry={!passwordVisible} // Utilise l'état pour afficher ou masquer le mot de passe
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="#94A3B8"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.loginButton, !isFormValid && styles.disabledButton]}
        onPress={handleLogin}
        disabled={!isFormValid}
      >
        <Text style={styles.loginButtonText}>Se connecter</Text>
      </TouchableOpacity>

      <Link href="/signUp" style={styles.signUpLink}>
        Pas encore de compte ? S’inscrire
      </Link>
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
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 24,
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
  },
  loginButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#FDE047",
    borderRadius: 24,
    alignItems: "center",
    marginVertical: 8,
  },
  disabledButton: {
    backgroundColor: "#D1D5DB",
  },
  loginButtonText: {
    color: "#713F12",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpLink: {
    fontSize: 16,
    marginTop: 8,
    color: "#94A3B8",
  },
});
