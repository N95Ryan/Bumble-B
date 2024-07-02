import { Text, StyleSheet, TouchableOpacity } from "react-native";

export const HomeButtons = () => {
  return (
    <>
      <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
        <Text style={styles.loginButtonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.guestButton}>
        <Text style={styles.guestButtonText}>Mode invité</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  input: {
    width: "100%",
    padding: 16,
    marginVertical: 8,
    borderRadius: 24,
    backgroundColor: "#F1F5F9",
    fontSize: 16,
    fontWeight: "normal",
  },

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
    borderRadius: 24,
    alignItems: "center",
    marginVertical: 8,
  },

  loginButtonText: {
    color: "#713F12",
    fontWeight: "bold",
    fontSize: 16,
  },

  guestButtonText: {
    color: "#1E293B",
    fontWeight: "bold",
    fontSize: 16,
  },
});
