import React from "react";
import { View, StyleSheet } from "react-native";
import StartRace from "./startRace";
import LastRace from "./lastRace";
import SecondPanel from "./secondPanel";

// Définir l'interface pour les props
interface RaceBoardProps {
  races: any[]; // Utilisez un type plus spécifique si possible
}

const RaceBoard: React.FC<RaceBoardProps> = ({ races }) => {
  return (
    <>
      <View style={styles.container}>
        <StartRace />
        <View style={styles.separator}></View>
        <LastRace races={races} /> {/* Passer les courses si nécessaire */}
      </View>
      <SecondPanel races={races} /> {/* Passer les courses si nécessaire */}
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
