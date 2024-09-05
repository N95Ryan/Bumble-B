import React from "react";
import { View, StyleSheet } from "react-native";
import StartRace from "./startRace";
import LastRace from "./lastRace";
import SecondPanel from "./secondPanel";

const RaceBoard = () => {
  return (
    <>
      <View style={styles.container}>
        <StartRace />
        <View style={styles.separator}></View>
        <LastRace />
      </View>
      <SecondPanel />
    </>
  );
};

export default RaceBoard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    borderRadius: 32,
    padding: 32,
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 24,
  },

  separator: {
    height: 1,
    backgroundColor: "#E2E8F0",
    width: "100%",
    marginTop: 4,
    marginBottom: 4,
  },
});
