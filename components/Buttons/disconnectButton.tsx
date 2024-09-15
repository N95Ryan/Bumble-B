import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { router, useRouter } from "expo-router";

const DisconnectButton = () => {
  const redirection = useRouter();

  const handleDisconnect = () => {};

  router.push("/home");

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleDisconnect}>
        <Text style={styles.button}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DisconnectButton;

const styles = StyleSheet.create({
  buttonContainer: {
    display: "flex",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 24,
    backgroundColor: "#FDE047",
    color: "#1E293B",
    textAlign: "center",
    fontSize: 14,
    fontStyle: "normal",
    marginVertical: 20,
  },

  button: {
    color: "#1E293B",
  },
});
