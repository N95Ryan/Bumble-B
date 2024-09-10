import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface SecondPanelProps {
  races: any[]; // Utilisez un type plus spécifique si possible
}

const SecondPanel: React.FC<SecondPanelProps> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.carSettings}>
        <Image source={require("./assets/Frame-1.svg")} style={styles.icon} />
        <Text style={styles.text}>Configurer la voiture</Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.help}>
        <Image source={require("./assets/Frame-2.svg")} style={styles.icon} />
        <Text style={styles.text}>Aides</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 24,
    marginHorizontal: 16,
    paddingVertical: 12,
  },

  carSettings: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 32,
  },

  separator: {
    height: 1,
    backgroundColor: "#E2E8F0",
    width: "100%",
    marginVertical: 4,
  },

  help: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 32,
  },

  icon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },

  text: {
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    color: "#1E293B",
  },

  raceSummary: {
    marginTop: 16,
    alignItems: "center",
  },
});

export default SecondPanel;
