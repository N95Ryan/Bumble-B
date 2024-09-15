import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const StartRace = () => {
  return (
    <View style={styles.container}>
      <View style={styles.startRaceContainer}>
        <Text style={styles.startRaceText}>Démarrer une course</Text>
        <Link href="/modes">
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
    backgroundColor: "",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 12,
  },

  startRaceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },

  startRaceText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
});
