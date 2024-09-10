// DataChoice.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DataChoice: React.FC = () => {
    return (
        <View style={[styles.parentDataFlexBox, styles.tempsSParentFlexBox]}>
            <View style={styles.dateDataButton}>
                <View style={[styles.wrapperFlexBox, styles.wrapperDataFlexBox, styles.dateDataContainerActive]}>
                <Text style={[styles.dateDataText, styles.dataText, styles.dateDataActiveText]}>Temps</Text>
                </View>
                <View style={[styles.wrapperFlexBox, styles.wrapperDataFlexBox]}>
                <Text style={[styles.dateDataText, styles.dataText]}>D. parc</Text>
                </View>
                <View style={[styles.wrapperFlexBox, styles.wrapperDataFlexBox]}>
                <Text style={[styles.dateDataText, styles.dataText]}>V. moy</Text>
                </View>
                <View style={[styles.wrapperFlexBox, styles.wrapperDataFlexBox]}>
                <Text style={[styles.dateDataText, styles.dataText]}>V. rot</Text>
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
