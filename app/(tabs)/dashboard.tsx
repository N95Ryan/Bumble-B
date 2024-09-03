import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface pour le payload JWT
interface JwtPayload {
  username: string;
  // Ajouter d'autres champs si nécessaire
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
    );

    return JSON.parse(jsonPayload);
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
        if (token) {
          // Décoder le JWT pour extraire le nom d'utilisateur
          const decodedToken = parseJwt(token) as JwtPayload;
          setUsername(decodedToken.username);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du token :", error);
      }
    };

    fetchUsername();
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>TABLEAU DE BORD</Text>
      <Text style={styles.greeting}>Bonjour {username}!</Text>
      <Text style={styles.text}>🚧 Page en construction 🚧</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffbf00",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f1f1f",
    textAlign: "center",
    margin: 4,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1f1f1f",
    textAlign: "center",
    margin: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f1f1f",
    textAlign: "center",
    fontFamily: "Arial",
    margin: 4,
  },
});
