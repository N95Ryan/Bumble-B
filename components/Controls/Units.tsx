import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Chronometre from '../../src/js/chronometre/chronometre';
import { calculateDistance } from '../../src/js/script_joystick_roues';
import Joystick from './Joystick';

interface ChronometreType {
  getTime: () => number;
}

const Units = ({ is_landscape }: { is_landscape: boolean }) => {
  const [message, setMessage] = useState<number>(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const lastTimeRef = useRef<number>(0);
  const chronometreRef = useRef<ChronometreType | null>(null);

  const handleEmit = useCallback((data: number) => {
    setMessage(data);
  }, []);

  function arrondir(nombre: number, decimales: number): number {
    const facteur = Math.pow(10, decimales);
    return Math.round(nombre * facteur) / facteur;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (chronometreRef.current) {
        const currentTime = chronometreRef.current.getTime();
        const elapsedTime = currentTime - lastTimeRef.current;

        const distanceSinceLastUpdate = calculateDistance(message, elapsedTime);

        setTotalDistance(prevDistance => prevDistance + distanceSinceLastUpdate);

        lastTimeRef.current = currentTime;
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <View style={[styles.units_container, is_landscape && styles.units_container_landscape]}>
      
      <View style={styles.unit_content}>
        <Chronometre ref={chronometreRef} />
        <Text style={styles.unit_label}>Vitesse</Text>
        <Text style={styles.unit_value}>{arrondir(message, 2)} m/s</Text>
            </View>
            <View style={styles.unit_content}>
                <Text style={styles.unit_label}>Distance</Text>
        <Text style={styles.unit_value}>{arrondir(totalDistance, 2)} m</Text>
      </View>
      <Joystick onEmit={handleEmit} is_landscape={is_landscape} />
    </View>
  );
};

const styles = StyleSheet.create({
    units_container: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 24,
    },
    unit_content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
        backgroundColor: 'rgba(2, 6, 23, 0.6)',
        position: 'absolute',
        left: 48,
        bottom: 24,
        padding: 24,
        borderRadius: 32,
    }
});

export default Units;
