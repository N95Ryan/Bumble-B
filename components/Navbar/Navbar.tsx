import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link, usePathname } from "expo-router";

const Navbar = () => {
  const pathname = usePathname(); // Récupère l'URL actuelle

  // Fonction pour obtenir l'icône active en fonction de la route
  const getActiveIcon = (): string => {
    if (pathname.startsWith("/dashboard")) {
      return "home";
    } else if (pathname.startsWith("/modes")) {
      return "modes";
    } else if (pathname.startsWith("/history")) {
      return "history";
    } else if (pathname.startsWith("/stats")) {
      return "stats";
    }
    return ""; // Aucun icône actif si aucune des routes n'est matchée
  };

  const activeIcon = getActiveIcon();

  return (
    <View style={styles.container}>
      <Link href={"/dashboard"} asChild>
        <TouchableOpacity>
          <Image
            source={require("../../components/Navbar/navbarAssets/FrameHome.svg")}
            style={[styles.icon, activeIcon === "home" && styles.selectedIcon]}
          />
        </TouchableOpacity>
      </Link>

      <Link href={"/modes"} asChild>
        <TouchableOpacity>
          <Image
            source={require("../../components/Navbar/navbarAssets/FrameCar.svg")}
            style={[styles.icon, activeIcon === "modes" && styles.selectedIcon]}
          />
        </TouchableOpacity>
      </Link>

      <Link href={"/history"} asChild>
        <TouchableOpacity>
          <Image
            source={require("../../components/Navbar/navbarAssets/FrameHistory.svg")}
            style={[
              styles.icon,
              activeIcon === "history" && styles.selectedIcon,
            ]}
          />
        </TouchableOpacity>
      </Link>

      <Link href={"/stats"} asChild>
        <TouchableOpacity>
          <Image
            source={require("../../components/Navbar/navbarAssets/FrameStats.svg")}
            style={[styles.icon, activeIcon === "stats" && styles.selectedIcon]}
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
    tintColor: "#3B82F6", // Couleur bleue pour l'icône sélectionnée
  },
});

export default Navbar;
