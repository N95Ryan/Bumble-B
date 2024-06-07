import { View, Text, StyleSheet, Image } from "react-native";

export const HeaderBlock = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/logoBordered.png")}
      />
      <Text style={styles.title}>Bumble B 🐝</Text>
      <Text style={styles.subtitle}>Connectez-vous</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 16,
  },

  logo: {
    marginBottom: 6,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#020617",
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#475569",
  },
});
