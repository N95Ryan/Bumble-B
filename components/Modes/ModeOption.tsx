import React from "react"; // Import de React pour créer des composants
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Import des composants React Native

// Définition des types des propriétés attendues par le composant ModeOption
type ModeOptionProps = {
  mode: "guided" | "manual"; // Type du mode, soit 'guided', soit 'manual'
  isSelected: boolean; // Indicateur si l'option est sélectionnée
  onPress: () => void; // Fonction qui sera appelée lorsque l'utilisateur appuie sur l'option
  iconSource: any; // Source de l'icône à afficher
  title: string; // Titre du mode
  description: string; // Description du mode
};

// Composant fonctionnel ModeOption
const ModeOption: React.FC<ModeOptionProps> = ({
  mode,
  isSelected,
  onPress,
  iconSource,
  title,
  description,
}) => {
  return (
    // Le bouton qui encapsule l'option de mode.
    // Il change de style si l'option est sélectionnée
    <TouchableOpacity
      style={[styles.content_mode, isSelected && styles.selected_mode]} // Applique le style conditionnel selon si le mode est sélectionné
      onPress={onPress} // Déclenche la fonction onPress lors du clic
    >
      {/* Vue qui contient l'icône et le titre du mode */}
      <View style={styles.icon_title_mode}>
        <Image
          style={styles.icon} // Style de l'icône (image)
          source={iconSource} // Source de l'icône
        />
        <Text style={styles.title_mode}>{title}</Text> {/* Titre du mode */}
      </View>
      {/* Texte qui affiche la description du mode */}
      <Text style={styles.text_mode}>{description}</Text>
    </TouchableOpacity>
  );
};

// Définition des styles pour le composant ModeOption
const styles = StyleSheet.create({
  content_mode: {
    display: "flex", // Utilise flexbox pour la mise en page
    flexDirection: "column", // Les éléments enfants sont placés en colonne
    backgroundColor: "#FFFFFF", // Couleur de fond blanche
    rowGap: 24, // Espace entre les lignes (éléments en colonne)
    borderRadius: 24, // Bordures arrondies
    padding: 24, // Espace intérieur
    borderColor: "#FFFFFF", // Couleur de la bordure par défaut (blanche)
    borderWidth: 2, // Épaisseur de la bordure
    width: "100%", // Le composant prend toute la largeur disponible
  },
  selected_mode: {
    borderColor: "#3B82F6", // Si le mode est sélectionné, la bordure devient bleue
  },
  icon_title_mode: {
    display: "flex", // Flexbox pour aligner les enfants
    flexDirection: "row", // Les éléments sont alignés en ligne (icône et titre)
    alignItems: "center", // Aligne les éléments verticalement au centre
    columnGap: 16, // Espace entre l'icône et le titre
  },
  title_mode: {
    fontSize: 25, // Taille du texte du titre
    fontWeight: "bold", // Texte en gras pour le titre
    color: "#1E293B", // Couleur du texte du titre
  },
  text_mode: {
    fontSize: 18, // Taille du texte pour la description
    color: "#64748B", // Couleur du texte pour la description
  },
  icon: {
    resizeMode: "contain", // Ajuste l'image de l'icône pour qu'elle s'adapte sans être étirée
  },
});

export default ModeOption; // Export du composant pour utilisation dans d'autres parties de l'application
