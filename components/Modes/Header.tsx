import { Link } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container_header}>
            <Link href="/dashboard" asChild>
                <TouchableOpacity>
                    <Image 
                        style={styles.icon}
                        source={require("../../assets/images/icon_return.svg")}/>
                </TouchableOpacity>
            </Link>
            <View style={styles.container_header_text}>
                <Text style={styles.header_title}>Démarrer une course</Text>
                <Text style={styles.header_text}>Choisir un mode</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container_header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 24,
        marginTop: 32,
        marginBottom: 100,
    },
    container_header_text: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 8,
    },
    header_title: {
        fontSize: 33,
        fontWeight: "bold",
        color: "#020617",
        maxWidth: 220,
    },
    header_text: {
        fontSize: 18,
        color: "#64748B",
    },
    icon: {
        resizeMode: 'contain',
    },
});
