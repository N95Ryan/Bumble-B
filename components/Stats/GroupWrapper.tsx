// GroupWrapper.tsx
import { StyleSheet, Text, View } from "react-native";

const GroupWrapper: React.FC = () => {
    return (
        <View style={styles.groupWrapper}>
            <View style={styles.groupView}>
                <View style={styles.frameParent}>
                    <Text style={[styles.mnTypo]}>Temps</Text>
                    <Text style={[styles.mnTypo, styles.mnTypoData]}>15 mn</Text>
                </View>
                <View style={styles.frameParent}>
                    <Text style={[styles.mnTypo]}>Distance Parcourue</Text>
                    <Text style={[styles.mnTypo, styles.mnTypoData]}>4 km</Text>
                </View>
                <View style={styles.frameParent}>
                    <Text style={[styles.mnTypo]}>Vitesse moyenne</Text>
                    <Text style={[styles.mnTypo, styles.mnTypoData]}>15 km/h</Text>
                </View>
                <View style={styles.frameParent}>
                    <Text style={[styles.mnTypo]}>Vitesse de rotation des roues</Text>
                    <Text style={[styles.mnTypo, styles.mnTypoData]}>15 tr/s</Text>
                </View>
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
        backgroundColor : "#FFFFFF",
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
        fontSize: 18,
        color: "#1E293B",
    },
    mnTypoData: {
        fontWeight: "700",
    }
});

export default GroupWrapper;
