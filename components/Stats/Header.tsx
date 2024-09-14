// FrameParent.tsx
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const Header: React.FC = () => {
    const router = useRouter();
    return (
        <View style={styles.frameParent}>
            <Pressable
                style={styles.frameIconLayout}
                onPress={() => router.push("/history")}
            >
                <Image
                style={[styles.icon, styles.iconLayout]}
                resizeMode="cover"
                source={require("../../assets/images/flèche.png")}
                />
            </Pressable>
            <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>Statistiques</Text>
                <Text style={styles.statsSubtitle}>
                Retrouvez vos courses ici et leurs statistiques
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    frameParent: {
        gap: 24,
        flexDirection: "row",
        alignSelf: "stretch",
        alignItems: "center",
    },
    iconLayout: {
        width: "100%",
        overflow: "hidden",
    },
    frameIconLayout: {
        width: 24,
        height: 24,
    },
    statsContainer: {
        gap: 8,
        flex: 1,
    },
    statsTitle: {
        fontSize: 33,
        color: "#020617",
        textAlign: "left",
        fontWeight: "700",
        alignSelf: "stretch",
    },
    statsSubtitle: {
        color: "#64748b",
        fontSize: 18,
        textAlign: "left",
        alignSelf: "stretch",
    },
    icon: {
        height: "100%",
        overflow: "hidden",
    },
});

export default Header;
