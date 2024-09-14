import { Image, StyleSheet, Text, View } from "react-native";

interface DateWrapperProps {
    selectedDate: string;
}

const DateWrapper: React.FC<DateWrapperProps> = ({ selectedDate }) => {
    const date = new Date(selectedDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    return (
        <View style={[styles.dateWrapper, styles.dateFlexBox]}>
            <View style={styles.frameWrapper}>
                <Image
                    style={[styles.frameIcon1, styles.frameIconLayout]}
                    resizeMode="cover"
                    source={require("../../../assets/images/Calendrier.png")}
                />
            </View>
            <View style={styles.parent}>
                <Text style={[styles.text, styles.jourTypo]}>{day}</Text>
                <Text style={[styles.text, styles.jourTypo , styles.mounthTypo]}>{month}</Text>
                <Text style={[styles.text, styles.jourTypo]}>{year}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dateWrapper: {
        position: "absolute",
        top: 12,
        zIndex: 2,
        left: "50%",
        transform: "translateX(-50%)",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#cbd5e1",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    dateFlexBox: {
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
    mounthTypo: {
        textTransform: "capitalize"
    }
});

export default DateWrapper;
