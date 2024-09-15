import React from "react"; // Import de React pour créer des composants
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Import des composants React Native
import ModeOption from "./ModeOption"; // Import du composant personnalisé ModeOption

// Définition des types des propriétés attendues par le composant ModeSelector
type ModeSelectorProps = {
  selectedMode: "guided" | "manual" | null; // Mode sélectionné, soit 'guided', 'manual' ou null si aucun mode n'est sélectionné
  setSelectedMode: (mode: "guided" | "manual") => void; // Fonction pour définir le mode sélectionné
  handlePress: () => void; // Fonction déclenchée lors de l'appui sur le bouton "Démarrer"
};

// Composant fonctionnel ModeSelector
const ModeSelector: React.FC<ModeSelectorProps> = ({
  selectedMode,
  setSelectedMode,
  handlePress,
}) => {
  return (
    // Conteneur principal du sélecteur de mode
    <View style={styles.container_mode}>
      {/* Option pour le mode guidé */}
      <ModeOption
        mode="guided" // Mode spécifique
        isSelected={selectedMode === "guided"} // Vérifie si le mode guidé est sélectionné
        onPress={() => setSelectedMode("guided")} // Définir le mode guidé quand l'utilisateur appuie
        iconSource={require("../../assets/images/icon_guide_mode.svg")} // Icône du mode guidé
        title="Mode guidé" // Titre du mode guidé
        description="Avec le mode guidé, la voiture se déplace automatiquement, vous aurez accès à la caméra et les données." // Description du mode guidé
      />
      {/* Option pour le mode manuel */}
      <ModeOption
        mode="manual" // Mode spécifique
        isSelected={selectedMode === "manual"} // Vérifie si le mode manuel est sélectionné
        onPress={() => setSelectedMode("manual")} // Définir le mode manuel quand l'utilisateur appuie
        iconSource={require("../../assets/images/icon_manuel_mode.svg")} // Icône du mode manuel
        title="Mode manuel" // Titre du mode manuel
        description="Avec le mode manuel, vous contrôlez entièrement la voiture avec la caméra, le joystick, et les données intégrées." // Description du mode manuel
      />
      {/* Bouton "Démarrer" */}
      <TouchableOpacity
        style={styles.button_mode} // Style du bouton démarrer
        onPress={handlePress} // Déclenche la fonction handlePress lors de l'appui sur le bouton
        disabled={!selectedMode} // Désactiver le bouton si aucun mode n'est sélectionné
      >
        <Text style={styles.button_text_mode}>Démarrer</Text>{" "}
        {/* Texte du bouton */}
      </TouchableOpacity>
    </View>
  );
};

// Définition des styles pour le composant ModeSelector
const styles = StyleSheet.create({
  container_mode: {
    display: "flex", // Utilise flexbox pour la mise en page
    flexDirection: "column", // Les éléments enfants sont placés en colonne
    alignItems: "flex-start", // Aligne les éléments au début de la ligne
    rowGap: 24, // Espace entre chaque option de mode
    width: "100%", // Le conteneur prend toute la largeur disponible
  },
  button_mode: {
    alignSelf: "center", // Aligne le bouton au centre horizontalement
    borderRadius: 24, // Bordures arrondies pour le bouton
    padding: 16, // Espace intérieur du bouton
    backgroundColor: "#FDE047", // Couleur de fond jaune pour le bouton
    marginTop: 24, // Marge en haut du bouton
  },
  button_text_mode: {
    fontSize: 20, // Taille du texte
    fontWeight: "medium", // Poids du texte moyen
    color: "#713F12", // Couleur du texte
  },
});

export default ModeSelector; // Export du composant pour utilisation dans d'autres parties de l'application
