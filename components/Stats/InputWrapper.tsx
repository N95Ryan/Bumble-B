// InputWrapper.tsx
import { Image, StyleSheet, Text, View } from "react-native";

const InputWrapper: React.FC = () => {
    return (
        <View style={[styles.inputWrapper, styles.tempsSParentFlexBox]}>
            <View style={[styles.input, styles.inputFlexBox]}>
                <View style={styles.frameWrapper}>
                <Image
                    style={[styles.frameIcon1, styles.frameIconLayout]}
                    resizeMode="cover"
                    source={require("../../assets/images/Calendrier.png")}
                />
                </View>
                <View style={styles.parent}>
                    <Text style={[styles.text, styles.jourTypo]}>31</Text>
                    <Text style={[styles.text, styles.jourTypo]}>Mai</Text>
                    <Text style={[styles.text, styles.jourTypo]}>2024</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputWrapper: {
        borderRadius: 32,
        paddingHorizontal: 8,
        flexDirection: "row",
    },
    tempsSParentFlexBox: {
        justifyContent: "center",
        alignSelf: "stretch",
        alignItems: "center",
    },
    input: {
        borderRadius: 8,
        backgroundColor: "#e2e8f0",
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignItems: "center",
        overflow: "hidden",
    },
    inputFlexBox: {
        gap: 16,
        flexDirection: "row",
    },
    frameWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
    frameIcon1: {
        overflow: "hidden",
    },
    frameIconLayout: {
        width: 24,
        height: 24,
    },
    parent: {
        gap: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        textAlign: "center",
    },
    jourTypo: {
        fontSize: 16,
        fontWeight: "500",
        color: "#3b82f6",
    },
});

export default InputWrapper;
