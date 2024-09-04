import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Link } from "expo-router";

const StartRace = () => {
  return (
    <View style={styles.container}>
      <View style={styles.startRaceContainer}>
        <Text style={styles.startRaceText}>Démarrer une course</Text>
        <Link href="/races">
          <Image source={require("../RaceBoard/assets/Frame-19.png")} />
        </Link>
      </View>
    </View>
  );
};

export default StartRace;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    alignSelf: "stretch",
    padding: 16,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 12,
  },

  startRaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  startRaceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
});
