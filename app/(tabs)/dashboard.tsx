import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface pour le payload JWT
interface JwtPayload {
  sub?: string;  // Utiliser 'sub' comme clé si c'est la clé de votre nom d'utilisateur
  // Ajouter d'autres champs si nécessaire
}

function parseJwt(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      throw new Error('Invalid token format');
    }
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    
    // Ajout du support pour UTF-8
    const decoded = decodeURIComponent(
      jsonPayload.split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join('')
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
          setUsername(decodedToken?.sub || 'Inconnu');
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
      <Text style={styles.greeting}>Bonjour {username} !</Text>
      <Text style={styles.text}>🚧 Page en construction 🚧</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
