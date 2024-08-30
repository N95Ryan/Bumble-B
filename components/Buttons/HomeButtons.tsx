import { Text, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";

export const HomeButtons = () => {
  return (
    <>
      <Link href={"/signUp"} style={styles.loginButton}>
      <Text style={styles.loginButtonText}>S'inscrire</Text>
      </Link>

      <Link href={"/"} style={styles.guestButton}>
      <Text style={styles.guestButtonText}>Mode invité</Text>
      </Link>
    </>
  );
};

const styles = StyleSheet.create({

 loginButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#FDE047",
    borderRadius: 24,
    alignItems: "center",
    marginVertical: 8,
  },

  guestButton: {
    width: "100%",
    padding: 16,
    backgroundColor: "#E2E8F0",
    borderRadius: Platform.OS === "web" ? 24 : 0,
    alignItems: "center",
    marginVertical: 8,
  },

  loginButtonText: {
    color: "#713F12",
    fontWeight: "bold",
    fontSize: 16,
    display: "flex",
    justifyContent: "center",

  },

  guestButtonText: {
    color: "#1E293B",
    fontWeight: "bold",
    fontSize: 16,
    display: "flex",
    justifyContent: "center",
  },
});
