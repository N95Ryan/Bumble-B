import { View, StyleSheet } from "react-native";
// Importation des composants personnalisés pour la page de connexion
import { HeaderBlockLogin } from "@/components/HeaderBlocks/HeaderBlockLogin";
import { LoginForm } from "@/components/Forms/LoginForm";

// Définition du composant fonctionnel LoginPage
export default function LoginPage() {
  return (
    <View style={styles.container}>
      <HeaderBlockLogin />
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
});
