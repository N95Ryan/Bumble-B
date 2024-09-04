import React from "react";
import { View, StyleSheet } from "react-native";
import StartRace from "./startRace";
import LastRace from "./lastRace";

const RaceBoard = () => {
  return (
    <View style={styles.container}>
      <StartRace />
      <View style={styles.separator}></View>
      <LastRace />
    </View>
  );
};

export default RaceBoard;

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

  separator: {
    height: 1,
    backgroundColor: "#E2E8F0",
    width: "100%",
    marginTop: 4,
    marginBottom: 4,
  },
});
