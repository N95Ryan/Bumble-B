import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

const Navbar = () => {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

  const handlePress = (iconName: string) => {
    setSelectedIcon(iconName);
  };

  return (
    <View style={styles.container}>
      <Link href={"/dashboard"} asChild>
        <TouchableOpacity onPress={() => handlePress("home")}>
          <Image
            source={require("../../components/Navbar/navbarAssets/home.svg")}
            style={[
              styles.icon,
              selectedIcon === "home" && styles.selectedIcon,
            ]}
          />
        </TouchableOpacity>
      </Link>

      <Link href={"/races"} asChild>
        <TouchableOpacity onPress={() => handlePress("races")}>
          <Image
            source={require("../../components/Navbar/navbarAssets/voiture.svg")}
            style={[
              styles.icon,
              selectedIcon === "races" && styles.selectedIcon,
            ]}
          />
        </TouchableOpacity>
      </Link>

      <Link href={"/history"} asChild>
        <TouchableOpacity onPress={() => handlePress("history")}>
          <Image
            source={require("../../components/Navbar/navbarAssets/historique.svg")}
            style={[
              styles.icon,
              selectedIcon === "history" && styles.selectedIcon,
            ]}
          />
        </TouchableOpacity>
      </Link>

      <Link href={"/stats"} asChild>
        <TouchableOpacity onPress={() => handlePress("history")}>
          <Image
            source={require("../../components/Navbar/navbarAssets/stats.svg")}
            style={[
              styles.icon,
              selectedIcon === "stats" && styles.selectedIcon,
            ]}
          />
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  icon: {
    width: 32,
    height: 32,
  },

  selectedIcon: {
    tintColor: "#3B82F6",
  },
});

export default Navbar;
