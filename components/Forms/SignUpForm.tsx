import { useState, useEffect } from "react";
import { useRouter } from 'expo-router'; // Assurez-vous d'utiliser useRouter pour la navigation
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { createUser } from "../../services/userServices";
import Toast from 'react-native-toast-message';

export const SignUpForm = () => {
  // Ajout des nouveaux champs d'état
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter(); // Obtenir l'instance du routeur

  // Fonction pour valider le formulaire
  const validateForm = () => {
    const isValid = firstname.trim() !== '' &&
                    lastname.trim() !== '' &&
                    username.trim() !== '' &&
                    email.trim() !== '' &&
                    password.trim() !== '' &&
                    confirmedPassword.trim() !== '' &&
                    password === confirmedPassword;
    setIsFormValid(isValid);
  };

  useEffect(() => {
    validateForm();
  }, [firstname, lastname, username, email, password, confirmedPassword]);

  const handleSignUp = async () => {
    if (!isFormValid) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: "Veuillez remplir tous les champs correctement.",
        visibilityTime: 4000,
      });
      return;
    }

    try {
      // Mise à jour de la fonction createUser pour accepter firstname et lastname
      await createUser(firstname, lastname, username, email, password, confirmedPassword);
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Succès',
        text2: "Utilisateur créé avec succès !",
        visibilityTime: 4000,
      });
      router.push('/login'); // Redirection vers /login
    } catch (error) {
      // Vérifier si l'erreur est une instance de Error
      const errorMessage = error instanceof Error ? error.message : "Une erreur inconnue est survenue.";

      console.error("Erreur lors de la création de l'utilisateur:", errorMessage);
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Erreur',
        text2: `Une erreur est survenue : ${errorMessage}`,
        visibilityTime: 4000,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Nouveau champ pour prénom */}
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor="#94A3B8"
        onChangeText={setFirstname}
        value={firstname}
      />
      
      {/* Nouveau champ pour nom de famille */}
      <TextInput
        style={styles.input}
        placeholder="Nom de famille"
        placeholderTextColor="#94A3B8"
        onChangeText={setLastname}
        value={lastname}
      />

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

      <TouchableOpacity 
        style={[styles.loginButton, !isFormValid && styles.disabledButton]} // Appliquer un style différent si le bouton est désactivé
        onPress={handleSignUp}
        disabled={!isFormValid} // Désactiver le bouton si le formulaire n'est pas valide
      >
        <Text style={styles.loginButtonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')} style={styles.loginLink}>
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
    padding: 16,
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
    justifyContent: "center",
  },

  disabledButton: {
    backgroundColor: "#D1D5DB", // Couleur de fond lorsque le bouton est désactivé
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
