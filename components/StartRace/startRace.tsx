import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const StartRace = () => {
  return (
    <View style={styles.container}>
      <View style={styles.startRaceContainer}>
        <Text style={styles.startRaceText}>Démarrer une course</Text>
        <Image
          style={styles.startRaceImage}
          source={require("../StartRace/assets/Frame-19.png")}
        />
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
    margin: 8, // Add margin to the container
  },

  startRaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    margin: 8, // Add margin to the startRaceContainer
  },

  startRaceText: {
    fontSize: 20,
    color: "#000",
    margin: 8, // Add margin to the startRaceText
  },

  startRaceImage: {
    fontSize: 28,
    color: "#000",
    margin: 8, // Add margin to the startRaceImage
  },

  playButtonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    margin: 8, // Add margin to the playButtonContainer
  },

  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    fontStyle: "italic",
    margin: 8, // Add margin to the playButton
  },

  detailsContainer: {
    marginBottom: 16, // Add margin to the detailsContainer
    margin: 8, // Add margin to the detailsContainer
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    margin: 8, // Add margin to the detailRow
  },
  detailLabel: {
    fontSize: 16,
    color: "#333",
    margin: 8, // Add margin to the detailLabel
  },
  detailValue: {
    fontSize: 16,
    color: "#666",
    margin: 8, // Add margin to the detailValue
  },
  historyButton: {
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    margin: 8, // Add margin to the historyButton
  },
  historyButtonText: {
    color: "#FFF",
    fontSize: 16,
    margin: 8, // Add margin to the historyButtonText
  },
});
