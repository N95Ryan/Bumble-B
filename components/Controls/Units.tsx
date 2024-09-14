import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter, Link } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Chronometre from "../../src/js/chronometre/chronometre";
import {
  calculateAverageSpeed,
  calculateDistance,
} from "../../src/js/script_joystick_roues";
import Joystick from "./Joystick";

// Define the User interface with the id property
interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  // Define other user properties as needed
}

interface ChronometreType {
  getTime: () => number;
  stop: () => void;
}

interface UnitsProps {
  is_landscape: boolean;
  user: User | null; // Update the type to include user
}

const Units = ({ is_landscape, user }: UnitsProps) => {
  const router = useRouter();
  const [vitesse, setVitesse] = useState<number>(0); // Vitesse actuelle
  const [totalDistance, setTotalDistance] = useState<number>(0); // Distance totale
  const [averageSpeed, setAverageSpeed] = useState<number | null>(null); // Vitesse moyenne
  const lastTimeRef = useRef<number>(0); // Temps de la dernière mise à jour
  const chronometreRef = useRef<ChronometreType | null>(null);
  const lastSpeedRef = useRef<number>(0); // Stocker la dernière vitesse connue

  // Fonction appelée à chaque mouvement du joystick pour mettre à jour la vitesse
  const handleEmit = useCallback((data: number) => {
    setVitesse(data); // Mettre à jour la vitesse actuelle
    lastSpeedRef.current = data; // Stocker la dernière vitesse
  }, []);

  // Fonction pour arrondir un nombre avec un certain nombre de décimales
  function arrondir(nombre: number, decimales: number): number {
    const facteur = Math.pow(10, decimales);
    return Math.round(nombre * facteur) / facteur;
  }

  // Mise à jour de la distance à chaque seconde
  useEffect(() => {
    const interval = setInterval(() => {
      if (chronometreRef.current) {
        const currentTime = chronometreRef.current.getTime(); // Temps actuel
        const elapsedTime = currentTime - lastTimeRef.current; // Temps écoulé depuis la dernière mise à jour

        if (elapsedTime > 0) {
          // Si le temps écoulé est supérieur à 0
          // Utilise la dernière vitesse connue pour calculer la distance parcourue
          const distanceSinceLastUpdate = calculateDistance(
            lastSpeedRef.current,
            elapsedTime
          );

          // Mettre à jour la distance totale
          setTotalDistance(
            (prevDistance) => prevDistance + distanceSinceLastUpdate
          );

          // Mettre à jour le temps de la dernière mise à jour
          lastTimeRef.current = currentTime;
        }
      }
    }, 1000); // Met à jour chaque seconde

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage
  }, []);

  // Fonction pour calculer la vitesse moyenne à la fin (quand on appuie sur stop)
  const handleStop = async () => {
    if (chronometreRef.current) {
      chronometreRef.current.stop();

      const totalTime = chronometreRef.current.getTime();
      if (totalTime > 0) {
        const finalAverageSpeed = calculateAverageSpeed(
          totalDistance,
          totalTime
        );
        setAverageSpeed(finalAverageSpeed);

        const requestBody = {
          averageSpeed: arrondir(finalAverageSpeed, 2),
          distanceCovered: arrondir(totalDistance, 2),
          timeSpent: arrondir(totalTime / 1000, 2), // Corrigé ici pour les secondes
          wheelRotationSpeed: 0,
          user: {
            id: user?.id || 0,
          },
        };

        try {
          // Retrieve the JWT token from AsyncStorage
          const token = await AsyncStorage.getItem("jwt_token");

          // Send the POST request
          await axios.post("http://localhost:8080/races", requestBody, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          console.log("Données envoyées avec succès.");
          router.push("/history");
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Erreur Axios:",
              error.response?.data || error.message
            );
          } else {
            console.error("Erreur lors de l'envoi des données:", error);
          }
        }
      } else {
        console.log("Temps total invalide.");
      }
    } else {
      console.log("Chronomètre non disponible.");
    }
  };

  return (
    <>
      <View
        style={[
          styles.units_container,
          is_landscape && styles.units_container_landscape,
        ]}
      >
        <View style={styles.unit_content}>
          <Text style={styles.unit_label}>Chronomètre</Text>
          <Chronometre ref={chronometreRef} />
          <Text style={styles.unit_label}>Vitesse</Text>
          <Text style={styles.unit_value}>{arrondir(vitesse, 2)} m/s</Text>
        </View>
        <View style={styles.unit_content}>
          <Text style={styles.unit_label}>Distance</Text>
          <Text style={styles.unit_value}>{arrondir(totalDistance, 2)} m</Text>
        </View>
      </View>
      <View
        style={
          is_landscape ? styles.joystickHorizontal : styles.joystickVertical
        }
      >
        <Joystick onEmit={handleEmit} is_landscape={is_landscape} />
      </View>

      <View
        style={
          is_landscape
            ? styles.buttonContainerHorizontal
            : styles.buttonContainerVertical
        }
      >
        <View
          style={
            is_landscape
              ? styles.stopButtonHorizontal
              : styles.stopButtonVertical
          }
        >
          <TouchableOpacity onPress={handleStop}>STOP</TouchableOpacity>
        </View>
        <View
          style={
            is_landscape
              ? styles.homeButtonHorizontal
              : styles.homeButtonVertical
          }
        >
          <Link href={"/dashboard"}>ACCUEIL</Link>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  units_container: {
    display: "flex",
    flexDirection: "column",
    rowGap: 24,
  },
  unit_content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 8,
  },
  unit_label: {
    fontSize: 17,
    color: "#94A3B8",
  },
  unit_value: {
    fontSize: 33,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  units_container_landscape: {
    width: 200,
    backgroundColor: "rgba(2, 6, 23, 0.6)",
    position: "absolute",
    left: 48,
    bottom: 24,
    padding: 24,
    borderRadius: 32,
  },

  buttonContainerHorizontal: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },

  buttonContainerVertical: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },

  stopButtonHorizontal: {
    width: 100,
    height: 50,
    backgroundColor: "#cf142b",
    fontFamily: "Roboto",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  stopButtonVertical: {
    width: 100,
    height: 50,
    backgroundColor: "#cf142b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },

  homeButtonHorizontal: {
    width: 100,
    height: 50,
    backgroundColor: "#FFFFFF",
    fontFamily: "Roboto",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  homeButtonVertical: {
    width: 100,
    height: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  joystickVertical: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  joystickHorizontal: {
    position: "absolute",
    bottom: 50,
    right: 50,
  },
});

export default Units;
