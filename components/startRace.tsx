import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const StartRace = () => {
  return (
    <View style={styles.container}>
      <View style={styles.playButtonTextContainer}>
        <Text style={styles.text}>Démarrer une course</Text>
        <TouchableOpacity style={styles.playButtonContainer}>
          <View style={styles.playButton} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Distance : </Text>
          <Text style={styles.detailValue}>4 km</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Vitesse max : </Text>
          <Text style={styles.detailValue}>15 km/h</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.historyButton}>
        <Text style={styles.historyButtonText}>
          Voir l'historique des courses
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartRace;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F7FA",
    borderRadius: 12,
    alignItems: "center",
  },
  playButtonTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16, // Ajout d'une marge en bas pour espacer des détails
  },
  playButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    margin: 8, // Ajout d'une marge droite pour espacer le bouton du texte
  },
  playButton: {
    width: 50,
    height: 50,
    backgroundColor: "#FFEB3B",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
  detailsContainer: {
    marginBottom: 16, // Ajout d'une marge en bas pour espacer du bouton d'historique
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: "#333",
  },
  detailValue: {
    fontSize: 16,
    color: "#666",
  },
  historyButton: {
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
  },
  historyButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
