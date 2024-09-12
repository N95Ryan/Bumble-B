import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import RaceBoard from "@/components/RaceBoard/RaceBoard";
import Navbar from "@/components/Navbar/Navbar";
import axios from "axios"; // Assurez-vous d'avoir installé axios avec `npm install axios` ou `yarn add axios`

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

const getUsersByUsername = async (username: string, token: string) => {
  try {
    const response = await axios.get("http://localhost:8080/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Users Response:", response.data);
    // Filtrer les utilisateurs par nom d'utilisateur
    const filteredUsers = response.data.filter(
      (user: any) => user.username === username
    );
    console.log("Filtered Users:", filteredUsers);
    return filteredUsers;
  } catch (error) {
    console.error("Get Users Error:", error);
    return [];
  }
};

const getRacesById = async (userId: string, token: string) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/users/${userId}/races`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Races Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Get Races Error:", error);
    return [];
  }
};

export default function Dashboard() {
  const [username, setUsername] = useState<string>("");
  const [races, setRaces] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token");
        console.log("Token récupéré depuis AsyncStorage:", token);

        if (token) {
          // Décoder le JWT pour extraire le nom d'utilisateur
          const decodedToken = parseJwt(token) as JwtPayload;
          console.log("Payload décodé:", decodedToken);
          const userName = decodedToken?.sub || "Inconnu";
          setUsername(userName);

          // Obtenir l'utilisateur correspondant
          const users = await getUsersByUsername(userName, token);
          const user = users[0]; // On suppose qu'il n'y a qu'un seul utilisateur avec ce nom
          if (user) {
            // Obtenir les courses de l'utilisateur
            const userRaces = await getRacesById(user.id, token);
            setRaces(userRaces);
          }
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du token ou des données utilisateur :",
          error
        );
      }
    };

    fetchUsername();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../components/RaceBoard/assets/Frame-1.png")}
        style={{ width: 56, height: 56 }}
      />
      <Text style={styles.greeting}>Bonjour {username}</Text>
      <Text style={styles.text}>Lorem ipsum dolor sit amet</Text>
      <RaceBoard races={races} />{" "}
      {/* Passez les courses au composant RaceBoard */}
      <Navbar />
    </View>
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
    backgroundColor: "#F1F5F9",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f1f1f",
    textAlign: "center",
    margin: 4,
  },

  greeting: {
    color: "#020617",
    fontSize: 33,
    fontStyle: "normal",
    fontWeight: "700",
  },

  text: {
    color: "#64748B",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
  },
});
