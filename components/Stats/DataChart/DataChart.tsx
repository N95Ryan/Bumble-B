import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ChartWrapper from "./ChartWrapper";
import DataChoice from "./DataChoice";
import DateWrapper from "./DateWrapper";

interface DataChartProps {
    timeSpent: number[];
    distanceCovered: number[];
    averageSpeed: number[];
    wheelRotationSpeed: number[];
    labels: string[];
    selectedDate: string;
}

const DataChart: React.FC<DataChartProps> = ({
    timeSpent,
    distanceCovered,
    averageSpeed,
    wheelRotationSpeed,
    labels,
    selectedDate
}) => {
    const [selectedData, setSelectedData] = useState<number[]>([]);
    const [dataType, setDataType] = useState<string>("timeSpent");

    useEffect(() => {
        switch (dataType) {
            case "timeSpent":
                setSelectedData(timeSpent);
                break;
            case "distanceCovered":
                setSelectedData(distanceCovered);
                break;
            case "averageSpeed":
                setSelectedData(averageSpeed);
                break;
            case "wheelRotationSpeed":
                setSelectedData(wheelRotationSpeed);
                break;
            default:
                setSelectedData(timeSpent);
                break;
        }
    }, [dataType, timeSpent, distanceCovered, averageSpeed, wheelRotationSpeed]);

    return (
        <View style={styles.containerDataChart}>
            <ChartWrapper data={selectedData} labels={labels} />
            <DataChoice onSelectData={setDataType} selectedType={dataType} />
            <DateWrapper selectedDate={selectedDate}/>
        </View>
    );
};

const styles = StyleSheet.create({
    containerDataChart: {
        position: "relative",
        zIndex: 1,
    },
});

export default DataChart;
