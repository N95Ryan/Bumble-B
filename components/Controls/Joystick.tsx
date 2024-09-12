import React, { useRef } from 'react';
import { View, PanResponder, StyleSheet, Animated } from 'react-native';
import { handleJoystickMove, updateSpeed } from '../../src/js/script_joystick_roues';

interface JoystickProps {
  onEmit?: (message: number) => void;
  is_landscape?: boolean;
}

// react memo pour eviter que le joystick se mette a jour en meme temps que units
// règle le problème de mouvement du joystick
const Joystick = React.memo(({ onEmit, is_landscape }: JoystickProps) => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const maxOffset = 50;


  // Création du panResponder pour gérer les mouvements du joystick
  const panResponder = PanResponder.create({

    // Indique qu'on doit gérer l'interaction tactile dès que l'utilisateur commence à bouger le joystick
    onMoveShouldSetPanResponder: () => true,
    // Gestion du mouvement du joystick
    onPanResponderMove: (e, gestureState) => {
      const { dx, dy } = gestureState; // Récupère les décalages (distance) sur l'axe horizontal (dx) et vertical (dy)

      // Clamp le déplacement pour qu'il ne dépasse pas maxOffset (50) dans les deux sens
      const clampedDx = Math.max(-maxOffset, Math.min(dx, maxOffset));
      const clampedDy = Math.max(-maxOffset, Math.min(dy, maxOffset));

      // Met à jour la position du joystick avec les valeurs clampées
      position.setValue({ x: clampedDx, y: clampedDy });

      // Appelle la fonction pour gérer le mouvement du joystick et calcule la vitesse
      const speedInMeterPerSecond = handleJoystickMove(clampedDx, clampedDy);

      // Si une fonction onEmit est définie, envoie la vitesse calculée
      if (typeof onEmit === 'function') {
        onEmit(speedInMeterPerSecond); // Émet la vitesse (sous forme de message numérique) via onEmit
      }
    },

    // Quand l'utilisateur relâche le joystick
    onPanResponderRelease: () => {
      // remet le joystick a 0 avec une animation plus fluide
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();

      // pour que la vitesse revienne a 0;
      if (typeof onEmit === 'function') {
        onEmit(0);
      }
      updateSpeed([0,0,0,0]);
    },
  });

  return (
    <View style={[styles.container, is_landscape && styles.containerLandscape]}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.joystick, { transform: position.getTranslateTransform() }]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  containerLandscape: {
    // Custom styles for landscape orientation if needed
  },
  joystick: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#333',
  },
});

export default Joystick;
