import React from "react";
import { View, Text, Image } from "react-native";
import { StyleSheet } from "react-native";

const SecondPanel = () => {
  return (
    <View style={styles.container}>
      <View style={styles.carSettings}>
        <Image source={require("./assets/Frame-1.svg")} style={styles.icon} />
        <Text>Configurer la voiture</Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.help}>
        <Image source={require("./assets/Frame-2.svg")} style={styles.icon} />
        <Text>Aides</Text>
      </View>
    </View>
  );
};

export default SecondPanel;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 24,
  },

  carSettings: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 380,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8,
  },

  separator: {
    height: 1,
    backgroundColor: "#E2E8F0",
    width: "100%",
    marginTop: 4,
    marginBottom: 4,
  },

  help: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 380,
    paddingTop: 8,
    paddingBottom: 8,
    gap: 8, // Ajoutez un espace entre les éléments si nécessaire
  },

  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 32,
    width: 32,
    marginRight: 8, // Espace entre les icônes et le texte
  },
});
