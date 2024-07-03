import { View, StyleSheet } from "react-native";
import { HeaderBlockLogin } from "@/components/HeaderBlocks/HeaderBlockLogin";
import { LoginForm } from "@/components/Forms/LoginForm";

export default function LoginPage() {
  return (
    <View style={styles.container}>
      <HeaderBlockLogin />
      <LoginForm />
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
