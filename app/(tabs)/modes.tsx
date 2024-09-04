import { StyleSheet, Text, View } from "react-native";

export default function ModesPage() {

    return (
        <View style={styles.container}>
            <Text>🚧 Modes Page 🚧</Text>
            <Text>🚧 Page en construction 🚧</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFF",
        padding: 24,
    },
});