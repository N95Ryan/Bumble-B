import React from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const LastRace = () => {
  return (
    <View>
      <Text style={style.title}>Dernière course</Text>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    display: "flex",
    width: 246,
    flexDirection: "column",
    justifyContent: "flex-end",
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
  },
});

export default LastRace;
