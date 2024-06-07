import { View, StyleSheet } from "react-native";
import { HeaderBlock } from "@/components/HeaderBlock";
import { LoginSignUp } from "@/components/LoginSignUp";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <HeaderBlock />
      <LoginSignUp />
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
