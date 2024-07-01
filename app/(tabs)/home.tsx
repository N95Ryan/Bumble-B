import { View, StyleSheet } from "react-native";
import { HeaderBlock } from "@/components/HeaderBlock";
import { HomeButtons } from "@/components/HomeButtons";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <HeaderBlock />
      <HomeButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
});
