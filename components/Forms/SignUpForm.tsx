import { useState } from "react";
import { useRouter } from "expo-router"; // Importer useRouter pour la navigation
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { createUser } from "../../services/userServices";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmPassword] = useState("");

  const router = useRouter(); // Obtenir l'instance du routeur

  const handleSignUp = async () => {
    if (password !== confirmedPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await createUser(username, email, password, confirmedPassword);
      alert("Utilisateur créé avec succès !");
      router.push("/login"); // Redirection vers /login
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      alert("Une erreur est survenue, veuillez réessayer.");
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
        placeholder="E-mail"
        placeholderTextColor="#94A3B8"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmation du mot de passe"
        placeholderTextColor="#94A3B8"
        secureTextEntry
        onChangeText={setConfirmPassword}
        value={confirmedPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
        <Text style={styles.loginButtonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={styles.loginLink}
      >
        <Text>Vous avez déjà un compte ? Connexion</Text>
      </TouchableOpacity>
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
    display: "flex",
    justifyContent: "center",
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
  },
});
