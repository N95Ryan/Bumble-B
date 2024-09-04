import { View, Text, StyleSheet } from "react-native";

export default function RacesPage() {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Courses</Text>
      <Text style={styles.text}>🚧 Page en construction 🚧</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffbf00",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f1f1f",
    textAlign: "center",
    margin: 4,
  },

  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f1f1f",
    textAlign: "center",
    fontFamily: "Arial",
    margin: 4,
  },
});
