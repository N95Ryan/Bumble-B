import { View, StyleSheet } from "react-native";
import { HeaderBlockSignUp } from "@/components/HeaderBlocks/HeaderBlockSignUp";
import { SignUpForm } from "@/components/Forms/SignUpForm";


// Définition du composant fonctionnel SignUpPage pour la page d'inscription
export default function SignUpPage() {
  return (
    <View style={styles.container}>
      <HeaderBlockSignUp />
      <SignUpForm />
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
