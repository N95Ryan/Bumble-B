import React, { useRef } from "react";
import { View, PanResponder, StyleSheet, Animated } from "react-native";
import {
  handleJoystickMove,
  updateSpeed,
} from "../../src/js/script_joystick_roues";

interface JoystickProps {
  onEmit?: (message: number) => void;
  is_landscape?: boolean;
}

// react memo pour eviter que le joystick se mette a jour en meme temps que units
// règle le problème de mouvement du joystick
const Joystick = React.memo(({ onEmit, is_landscape }: JoystickProps) => {
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const maxOffset = 50;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      const { dx, dy } = gestureState;

      const clampedDx = Math.max(-maxOffset, Math.min(dx, maxOffset));
      const clampedDy = Math.max(-maxOffset, Math.min(dy, maxOffset));

      position.setValue({ x: clampedDx, y: clampedDy });

      const speedInMeterPerSecond = handleJoystickMove(clampedDx, clampedDy);
      console.log("Speed:", speedInMeterPerSecond);

      if (typeof onEmit === "function") {
        onEmit(speedInMeterPerSecond);
      }
    },

    onPanResponderRelease: () => {
      Animated.spring(position, {
        toValue: { x: 0, y: 0 },
        useNativeDriver: false,
      }).start();

      if (typeof onEmit === "function") {
        onEmit(0);
      }
      updateSpeed([0, 0, 0, 0]);
    },
  });

  return (
    <View style={[styles.container, is_landscape && styles.containerLandscape]}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.joystick,
          { transform: position.getTranslateTransform() },
        ]}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  containerLandscape: {
    // Custom styles for landscape orientation if needed
  },
  joystick: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#333",
  },
});

export default Joystick;
