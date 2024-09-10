// ContainerDataChart.tsx
import ChartWrapper from "@/components/Stats/DataChart/ChartWrapper";
import DataChoice from "@/components/Stats/DataChart/DataChoice";
import DateChoice from "@/components/Stats/DataChart/DateChoice";
import React from "react";
import { StyleSheet, View } from "react-native";

const ContainerDataChart: React.FC = () => {
    return (
        <View style={styles.containerDataChart}>
            <DateChoice />
            <ChartWrapper />
            <DataChoice />
        </View>
    );
};

const styles = StyleSheet.create({
    containerDataChart: {
        position: "relative",
        zIndex: 1,
    },
});

export default ContainerDataChart;
