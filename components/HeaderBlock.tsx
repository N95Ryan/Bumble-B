import { View, Text, StyleSheet, Image } from "react-native";

export const HeaderBlock = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logoBordered.png")}
      />
      <Text style={styles.title}>Bumble B 🐝</Text>
      <Text style={styles.subtitle}>Connectez-vous</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#020617",
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#475569",
  },
});
