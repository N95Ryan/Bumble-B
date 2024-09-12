import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface ChartWrapperProps {
    data: number[];
    labels: string[];
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({ data, labels }) => {
    const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width);

    useEffect(() => {
        const updateWidth = () => {
            const width = Dimensions.get("window").width;
            setScreenWidth(width);
        };

        const dimensionListener = Dimensions.addEventListener("change", updateWidth);

        return () => {
            dimensionListener?.remove(); 
        };
    }, []);

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
            },
        ],
    };

    return (
        <View style={styles.chartContainer}>
            <LineChart
                data={chartData}
                width={screenWidth - 48}
                height={220}
                fromZero={true}
                chartConfig={{
                    backgroundColor: "#E2E8F0",
                    backgroundGradientFrom: "#E2E8F0",
                    backgroundGradientTo: "#E2E8F0",
                    color: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(30, 41, 59, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "0",
                        strokeWidth: "0",
                    },
                    propsForBackgroundLines: {
                        strokeWidth: 0,
                    },
                    fillShadowGradient: "#1E293B",
                    fillShadowGradientOpacity: 1,
                    useShadowColorFromDataset: false,
                }}
                bezier
            />
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        paddingVertical: 32,
        marginTop: 32,
        marginBottom: 24,
        borderRadius: 24,
        alignItems: "center",
        backgroundColor: "#E2E8F0",
    },
});

export default ChartWrapper;
