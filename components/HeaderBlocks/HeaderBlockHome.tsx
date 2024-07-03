import { View, Image, Text, Dimensions, StyleSheet} from "react-native";

export const HeaderBlockHome = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bigLogoBordered.png")}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bumble B</Text>
        <Text style={styles.subtitle}>Transformez votre smartphone en un volant virtuel et vivez des sensations fortes à chaque course !</Text>
      </View>
    </View>
  );};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
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
    fontWeight: "bold",
    color: "#475569",
    textAlign: "center",
  }
});
