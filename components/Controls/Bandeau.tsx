import React, { useRef, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Bandeau = ({ is_landscape }: { is_landscape: boolean }) => {
  const [isRunning, setIsRunning] = useState(false);
  const chronometreRef = useRef<any>(null);

  const handleStop = () => {
    setIsRunning(false);
    if (chronometreRef.current) {
      chronometreRef.current.stop();
    }
  };

  return (
    <>
      <View
        style={[
          styles.container_bandeau,
          is_landscape && styles.container_bandeau_landscape,
        ]}
      >
        <View style={styles.container_icons}>
          <Image
            style={styles.icon}
            source={require("../../assets/images/icon_photo.svg")}
          />
          <Image
            style={styles.icon}
            source={require("../../assets/images/icon_rotate.svg")}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container_bandeau: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24,
  },
  icon: {
    resizeMode: "contain",
  },
  time_value: {
    fontSize: 33,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  container_icons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 16,
  },
  container_bandeau_landscape: {
    backgroundColor: "rgba(2, 6, 23, 0.6)",
    position: "absolute",
    top: 24,
    left: 48,
    right: 48,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 32,
    width: "auto",
  },
  stopButton: {
    width: 50,
    height: 25,
    paddingHorizontal: 18,
    backgroundColor: "#cf142b",
    color: "#FFFFFF",
    borderRadius: 6,
    fontFamily: "Roboto",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Bandeau;