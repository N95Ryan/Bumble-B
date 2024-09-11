import React, { useState, useRef, useEffect, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import Chronometre from "../../src/js/chronometre/chronometre";
import {
  calculateDistance,
  calculateAverageSpeed,
} from "../../src/js/script_joystick_roues";
import Joystick from "./Joystick";

interface ChronometreType {
  getTime: () => number;
  stop: () => void;
}

interface ChronometreType {
  getTime: () => number;
  stop: () => void;
}

const Units = ({ is_landscape }: { is_landscape: boolean }) => {
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
  const handleStop = () => {
    if (chronometreRef.current) {
      chronometreRef.current.stop();

      const totalTime = chronometreRef.current.getTime(); // Temps total écoulé
      if (totalTime > 0) {
        const finalAverageSpeed = calculateAverageSpeed(
          totalDistance,
          totalTime
        );
        setAverageSpeed(finalAverageSpeed); // Mettre à jour la vitesse moyenne
      }
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
          <Text style={styles.unit_label}>Vitesse</Text>
          <Text style={styles.unit_value}>{arrondir(vitesse, 2)} m/s</Text>
        </View>
        <View style={styles.unit_content}>
          <Text style={styles.unit_label}>Distance</Text>
          <Text style={styles.unit_value}>{arrondir(totalDistance, 2)} m</Text>
        </View>
        {/* <View style={styles.unit_content}>
        <Text style={styles.unit_label}>Vitesse Moyenne</Text>
        {averageSpeed !== null ? (
          <Text style={styles.unit_value}>{arrondir(averageSpeed, 2)} m/s</Text>
        ) : (
          <Text style={styles.unit_value}>-</Text> // Affiche un tiret si la vitesse moyenne n'est pas encore calculée
        )}
      </View> */}
        {/* <Text onPress={handleStop} style={styles.stopButton}>
        Stop
        </Text> */}
      </View>
      <View
        style={
          is_landscape ? styles.joystickHorizontal : styles.joystickVertical
        }
      >
        <Joystick onEmit={handleEmit} is_landscape={is_landscape} />
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
    width: 250,
    backgroundColor: "rgba(2, 6, 23, 0.6)",
    position: "absolute",
    left: 48,
    bottom: 24,
    padding: 24,
    borderRadius: 32,
  },

  stopButton: {
    fontSize: 18,
    color: "#FF0000",
    padding: 10,
    backgroundColor: "#333333",
    textAlign: "center",
    borderRadius: 5,
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
