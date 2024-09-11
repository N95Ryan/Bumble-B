import { View, StyleSheet } from "react-native";
// Importation des composants personnalisés pour la page d'accueil
import { HeaderBlockHome } from "@/components/HeaderBlocks/HeaderBlockHome";
import { HomeButtons } from "@/components//Buttons/HomeButtons";

// Définition du composant fonctionnel Homepage
export default function Homepage() {
  // Rendu de la vue principale de la page d'accueil
  return (
    <View style={styles.container}>
      <HeaderBlockHome />
      <HomeButtons />
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