import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartRace from "@/components/RaceBoard/RaceBoard";
import { Image } from "react-native";

// Interface pour le payload JWT
interface JwtPayload {
  sub?: string; // Utiliser 'sub' comme clé si c'est la clé de votre nom d'utilisateur
  // Ajouter d'autres champs si nécessaire
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      throw new Error("Invalid token format");
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);

    // Ajout du support pour UTF-8
    const decoded = decodeURIComponent(
      jsonPayload
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(decoded);
  } catch (error) {
    console.error("Erreur lors du décodage du JWT :", error);
    return null;
  }
}

export default function DashboardPage() {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token");
        console.log("Token récupéré depuis AsyncStorage:", token);

        if (token) {
          // Décoder le JWT pour extraire le nom d'utilisateur
          const decodedToken = parseJwt(token) as JwtPayload;
          console.log("Payload décodé:", decodedToken);
          setUsername(decodedToken?.sub || "Inconnu");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du token :", error);
      }
    };

    fetchUsername();
  }, []);

  return (

    <>
      <View style={styles.container}>
        <Image
          source={require("../../components/RaceBoard/assets/Frame-1.png")}
          style={{ width: 56, height: 56 }}
        />
        <Text style={styles.greeting}>Bonjour {username}</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet</Text>
        <StartRace />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
    
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f1f1f",
    textAlign: "center",
    margin: 4,
  },

  greeting: {
    color: "#1E293B",
    fontSize: 33,
    fontStyle: "normal",
    fontWeight: 700,
  },

  text: {
    color: "#64748B",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: 400,
  },
});
