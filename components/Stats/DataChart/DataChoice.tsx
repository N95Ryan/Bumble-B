import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DataChoiceProps {
    onSelectData: (type: string) => void;
    selectedType: string;
}

const ButtonsChoiceData = [
    { type: "timeSpent", label: "Temps" },
    { type: "distanceCovered", label: "D. parc" },
    { type: "averageSpeed", label: "V. moy" },
    { type: "wheelRotationSpeed", label: "V. rot" },
];

const DataChoice: React.FC<DataChoiceProps> = ({ onSelectData, selectedType }) => {
    return (
        <View style={[styles.parentDataFlexBox, styles.tempsSParentFlexBox]}>
            <View style={styles.dateDataButton}>
                {ButtonsChoiceData.map(({ type, label }) => (
                    <TouchableOpacity 
                    key={type} 
                    onPress={() => onSelectData(type)} 
                    style={[styles.wrapperFlexBox, styles.wrapperDataFlexBox, selectedType === type && styles.dateDataContainerActive]}>
                        <Text 
                        style={[styles.dateDataText, styles.dataText,selectedType === type && styles.dateDataActiveText]}>
                        {label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tempsSParentFlexBox: {
        justifyContent: "center",
        alignSelf: "stretch",
        alignItems: "center",
    },
    parentDataFlexBox: {
        position: "absolute",
        bottom: 8,
        zIndex: 2,
        left: "50%",
        transform: "translateX(-50%)",
    },
    dateDataButton: {
        backgroundColor: "#cbd5e1",
        padding: 4,
        borderRadius: 24,
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
        overflow: "hidden",
    },
    wrapperFlexBox: {
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    wrapperDataFlexBox: {
        width: 60,
        paddingHorizontal: 8,
    },
    dateDataContainerActive: {
        backgroundColor: "#FFFFFF",
    },
    dateDataText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        color: "#1e293b",
    },
    dateDataActiveText: {
        color: "#3b82f6",
        fontWeight: "700",
    },
    dataText: {
        fontSize: 10,
    },
});

export default DataChoice;
