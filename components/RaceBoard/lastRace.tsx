import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

const LastRace = () => {
  return (
    <View>
      <Text style={style.title}>Dernière course</Text>
      <View style={style.data}>
        <Text>Date :</Text>
        <Text>Temps :</Text>
        <Text>Distance :</Text>
        <Text>Vitesse max :</Text>
      </View>
      <View>
        <Link href="/history" style={style.link}>
          Voir l’historique des courses
        </Link>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    display: "flex",
    width: 246,
    flexDirection: "column",
    justifyContent: "flex-end",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: 700,
    color: "#1E293B",
    marginTop: 12,
  },

  data: {
    marginTop: 16,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    alignSelf: "stretch",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 400,
    color: "#1E293B",
  },

  link: {
    display: "flex",
    height: 51,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 24,
    backgroundColor: "#E2E8F0",
    color: "#1E293B",
    textAlign: "center",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: 20,
    letterSpacing: -0.32,
  },
});

export default LastRace;
