import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface GroupWrapperProps {
  timeSpent: number[];
  distanceCovered: number[];
  averageSpeed: number[];
  wheelRotationSpeed: number[];
}

const GroupWrapper: React.FC<GroupWrapperProps> = ({
  timeSpent,
  distanceCovered,
  averageSpeed: averageSpeedData,
  wheelRotationSpeed,
}) => {
  const calculateAverage = (data: number[]) => {
    if (data.length === 0) return 0;
    const total = data.reduce((acc, value) => acc + value, 0);
    return total / data.length;
  };

  const averageTimeSpent = calculateAverage(timeSpent);
  const averageDistance = calculateAverage(distanceCovered);
  const averageSpeed = calculateAverage(averageSpeedData);
  const averageWheelRotation = calculateAverage(wheelRotationSpeed);

  const dataRows = [
    { label: "Temps moyen :", value: `${averageTimeSpent.toFixed(2)} min` },
    { label: "Distance moyenne parcourue :", value: `${averageDistance.toFixed(2)} m` },
    { label: "Vitesse moyenne :", value: `${averageSpeed.toFixed(2)} m/s` },
    {
      label: "Vitesse de rotation des roues",
      value: `${averageWheelRotation.toFixed(2)} tr/s`,
      hide: true,
    },
  ];

  return (
    <View style={styles.groupWrapper}>
      <View style={styles.groupView}>
        {dataRows.map((row, index) => (
          <View key={index} style={[styles.frameParent, row.hide && styles.rotateNone]}>
            <Text style={styles.mnTypo}>{row.label}</Text>
            <Text style={[styles.mnTypo, styles.mnTypoData]}>{row.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  groupWrapper: {
    flex: 1,
  },
  groupView: {
    gap: 12,
    flexDirection: "column",
    alignSelf: "stretch",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 24,
  },
  frameParent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  mnTypo: {
    fontSize: 16,
    color: "#1E293B",
    textAlign: "left",
  },
  mnTypoData: {
    fontWeight: "700",
    textAlign: "right",
  },
  rotateNone:{
    display: "none",
  }
});

export default GroupWrapper;
