import { View, Text, StyleSheet, Image } from "react-native";

export const HeaderBlockSignUp = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require("../../assets/images/smallLogoBordered.png")}
      />
      <View style={styles.titleContainer}>
      <Text style={styles.title}>Bumble B</Text>
      <Text style={styles.subtitle}>Inscrivez-vous</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 150,
    height: 150,
  },


  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 48,
    paddingBottom: 48,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#020617",
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#475569",
    textAlign: "center",
  }
});