import { View, Text, Image, StyleSheet } from "react-native";
const HeaderPage = () => {
  <View style={styles.container}>
    <Image
      source={require("@/assets/images/logoBordered.png")}
      style={styles.logoBordered}
    />
    <Text style={styles.title}>Bumble B</Text>
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff", // You can adjust this according to the theme
  },

  logoBordered: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1D3D47",
  },
});

export default HeaderPage;
