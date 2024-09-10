// DateChoice.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DateChoice: React.FC = () => {
    return (
        <View style={[styles.parentDateFlexBox, styles.tempsSParentFlexBox]}>
            <View style={styles.dateDataButton}>
                <View style={[styles.wrapperFlexBox, styles.dateDataContainerActive]}>
                <Text style={[styles.dateDataText, styles.dateDataActiveText]}>Jour</Text>
                </View>
                <View style={styles.wrapperFlexBox}>
                <Text style={styles.dateDataText}>Semaine</Text>
                </View>
                <View style={styles.wrapperFlexBox}>
                <Text style={styles.dateDataText}>Mois</Text>
                </View>
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
    parentDateFlexBox: {
        position: "absolute",
        zIndex: 2,
        top: 8,
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
});

export default DateChoice;
