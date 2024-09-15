import AsyncStorage from "@react-native-async-storage/async-storage"; // Stockage asynchrone pour les tokens
import axios from "axios"; // Librairie pour les requêtes HTTP
import { useRouter, Link } from "expo-router"; // Navigation via Expo Router
import React, { useCallback, useEffect, useRef, useState } from "react"; // Import des hooks React
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Composants de base React Native
import Chronometre from "../../src/js/chronometre/chronometre"; // Import du composant Chronomètre
import {
  calculateAverageSpeed,
  calculateDistance,
} from "../../src/js/script_joystick_roues"; // Calculs pour la vitesse et la distance
import Joystick from "./Joystick"; // Import du Joystick
import { HomeButtons } from "../Buttons/HomeButtons"; // Import des boutons de la page d'accueil

// Définition de l'interface User avec l'id et autres propriétés
interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  // Ajoute d'autres propriétés utilisateur si nécessaire
}

// Interface pour le Chronomètre, pour récupérer le temps et l'arrêter
interface ChronometreType {
  getTime: () => number; // Récupérer le temps en cours
  stop: () => void; // Arrêter le chronomètre
}

// Props pour le composant Units, incluant l'orientation de l'écran et l'utilisateur
interface UnitsProps {
  is_landscape: boolean; // Indicateur si l'orientation est en paysage
  user: User | null; // Informations sur l'utilisateur, ou null si non disponible
}

// Composant principal Units
const Units = ({ is_landscape, user }: UnitsProps) => {
  const router = useRouter(); // Utilisé pour naviguer entre les pages
  const [vitesse, setVitesse] = useState<number>(0); // Vitesse actuelle
  const [totalDistance, setTotalDistance] = useState<number>(0); // Distance totale parcourue
  const [averageSpeed, setAverageSpeed] = useState<number | null>(null); // Vitesse moyenne
  const lastTimeRef = useRef<number>(0); // Stocke le dernier temps de mise à jour
  const chronometreRef = useRef<ChronometreType | null>(null); // Référence au chronomètre
  const lastSpeedRef = useRef<number>(0); // Stocke la dernière vitesse connue

  // Fonction appelée à chaque mouvement du joystick pour mettre à jour la vitesse
  const handleEmit = useCallback((data: number) => {
    setVitesse(data); // Met à jour la vitesse actuelle
    lastSpeedRef.current = data; // Stocke la dernière vitesse
  }, []);

  // Fonction pour arrondir un nombre à un certain nombre de décimales
  function arrondir(nombre: number, decimales: number): number {
    const facteur = Math.pow(10, decimales); // Crée un facteur pour arrondir
    return Math.round(nombre * facteur) / facteur; // Retourne le nombre arrondi
  }

  // Mise à jour de la distance chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      if (chronometreRef.current) {
        const currentTime = chronometreRef.current.getTime(); // Récupère le temps actuel du chronomètre
        const elapsedTime = currentTime - lastTimeRef.current; // Calcule le temps écoulé depuis la dernière mise à jour

        if (elapsedTime > 0) {
          // Si le temps écoulé est positif
          const distanceSinceLastUpdate = calculateDistance(
            lastSpeedRef.current,
            elapsedTime
          ); // Calcule la distance parcourue depuis la dernière mise à jour
          setTotalDistance(
            (prevDistance) => prevDistance + distanceSinceLastUpdate
          ); // Met à jour la distance totale
          lastTimeRef.current = currentTime; // Met à jour le dernier temps
        }
      }
    }, 1000); // Exécute toutes les secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle à la fin
  }, []);

  // Fonction pour calculer la vitesse moyenne lorsqu'on appuie sur "STOP"
  const handleStop = async () => {
    if (chronometreRef.current) {
      chronometreRef.current.stop(); // Arrête le chronomètre

      const totalTime = chronometreRef.current.getTime(); // Récupère le temps total écoulé
      if (totalTime > 0) {
        // Si le temps est valide
        const finalAverageSpeed = calculateAverageSpeed(
          totalDistance,
          totalTime
        ); // Calcule la vitesse moyenne
        setAverageSpeed(finalAverageSpeed); // Met à jour la vitesse moyenne

        // Préparation du corps de la requête
        const requestBody = {
          averageSpeed: arrondir(finalAverageSpeed, 2), // Arrondit la vitesse moyenne à 2 décimales
          distanceCovered: arrondir(totalDistance, 2), // Arrondit la distance parcourue à 2 décimales
          timeSpent: arrondir(totalTime / 1000, 2), // Convertit le temps en secondes et l'arrondit
          wheelRotationSpeed: 0, // Placeholder pour une vitesse de rotation des roues
          user: {
            id: user?.id || 0, // Inclut l'ID utilisateur si disponible
          },
        };

        try {
          // Récupère le token JWT stocké
          const token = await AsyncStorage.getItem("jwt_token");

          // Envoie la requête POST avec les données
          await axios.post("http://localhost:8080/races", requestBody, {
            headers: {
              Authorization: `Bearer ${token}`, // Ajoute le token dans les headers
              "Content-Type": "application/json", // Spécifie le type de contenu
            },
          });

          router.push("/history"); // Redirige vers l'historique après l'envoi
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Erreur Axios:",
              error.response?.data || error.message
            ); // Affiche l'erreur si Axios échoue
          } else {
            console.error("Erreur lors de l'envoi des données:", error); // Affiche toute autre erreur
          }
        }
      } else {
      }
    } else {
    }
  };

  return (
    <>
      {/* Conteneur principal pour afficher les unités comme le chronomètre et la vitesse */}
      <View
        style={[
          styles.units_container,
          is_landscape && styles.units_container_landscape,
        ]}
      >
        <View style={styles.unit_content}>
          <Text style={styles.unit_label}>Chronomètre</Text>
          <Chronometre ref={chronometreRef} /> {/* Affiche le chronomètre */}
          <Text style={styles.unit_label}>Vitesse</Text>
          <Text style={styles.unit_value}>{arrondir(vitesse, 2)} m/s</Text>{" "}
          {/* Affiche la vitesse actuelle */}
        </View>
        <View style={styles.unit_content}>
          <Text style={styles.unit_label}>Distance</Text>
          <Text style={styles.unit_value}>
            {arrondir(totalDistance, 2)} m
          </Text>{" "}
          {/* Affiche la distance totale */}
        </View>
      </View>

      {/* Joystick et boutons */}
      <View
        style={[
          is_landscape
            ? styles.joystickHorizontal
            : styles.joystickAndButtonsVertical,
        ]}
      >
        <Joystick onEmit={handleEmit} is_landscape={is_landscape} />{" "}
        {/* Joystick pour ajuster la vitesse */}
        <View
          style={[
            is_landscape
              ? styles.buttonContainerHorizontal
              : styles.buttonContainerVertical,
          ]}
        >
          <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
            {" "}
            {/* Bouton STOP */}
            STOP
          </TouchableOpacity>
          <View style={styles.homeButton}>
            {" "}
            {/* Bouton Accueil */}
            <Link href="/dashboard" style={styles.homeButtonText}>
              ACCUEIL
            </Link>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // Styles pour les conteneurs et éléments du composant
  units_container: { display: "flex", flexDirection: "column", rowGap: 24 },
  unit_content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 8,
  },
  unit_label: { fontSize: 17, color: "#94A3B8" },
  unit_value: { fontSize: 33, fontWeight: "bold", color: "#FFFFFF" },
  units_container_landscape: {
    width: 200,
    backgroundColor: "rgba(2, 6, 23, 0.6)",
    position: "absolute",
    left: 48,
    bottom: 24,
    padding: 24,
    borderRadius: 32,
  },
  joystickAndButtonsVertical: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  joystickHorizontal: { position: "absolute", bottom: 50, right: 50 },
  buttonContainerHorizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    marginRight: 12,
    position: "absolute",
    bottom: 150,
    left: 0,
    right: 0,
  },
  buttonContainerVertical: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  stopButton: {
    width: 100,
    height: 50,
    backgroundColor: "#cf142b",
    fontFamily: "Roboto",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  homeButton: {
    width: 100,
    height: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  homeButtonText: { color: "#000", fontFamily: "Roboto", fontWeight: "bold" },
});

export default Units;
