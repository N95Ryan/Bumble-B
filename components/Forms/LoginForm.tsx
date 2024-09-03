import { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router"; // Importez Link depuis expo-router
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { authentification } from "../../services/userServices"; // Assurez-vous que ce chemin est correct
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter(); // Obtenir l'instance du routeur

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const isValid = username.trim() !== "" && password.trim() !== "";
    setIsFormValid(isValid);
  };

  // Utiliser useEffect pour valider le formulaire chaque fois qu'un champ change
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
      console.log("Réponse de l'API :", response); // Ajoutez cette ligne pour déboguer

      if (response && response.token) {
        await AsyncStorage.setItem("jwt_token", response.token); // Stockage du token JWT
        Alert.alert("Succès", "Connexion réussie !");

        // Récupérer et afficher le token dans la console
        const token = await AsyncStorage.getItem("jwt_token");
        console.log("Token JWT récupéré :", token);

        router.push("/dashboard"); // Redirection vers la page dashboard
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
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
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
