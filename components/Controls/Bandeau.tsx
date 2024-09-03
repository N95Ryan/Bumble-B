import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Bandeau = ({ is_landscape }: { is_landscape: boolean }) => {
    return (
        <View style={[styles.container_bandeau, is_landscape && styles.container_bandeau_landscape]}>
            <Image 
                style={styles.icon}
                source={require("../../assets/images/icon_camera.svg")}
            />
            <Text style={styles.time_value}>00:09:11</Text>
            <View style={styles.container_icons}>
                <Image 
                    style={styles.icon}
                    source={require("../../assets/images/icon_photo.svg")}
                />
                <Image 
                    style={styles.icon}
                    source={require("../../assets/images/icon_rotate.svg")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container_bandeau: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 24,
    },
    icon: {
        width: 32,
        height: 32,
    },
    time_value: {
        fontSize: 33,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    container_icons: {
        display: 'flex',
        flexDirection: 'row',
        columnGap: 16,
    },
    container_bandeau_landscape: {
        backgroundColor: 'rgba(2, 6, 23, 0.6)',
        position: 'absolute',
        top: 24,
        left: 48,
        right: 48,
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 32,
        width: 'auto',
    }
});

export default Bandeau;
