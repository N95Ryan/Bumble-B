import React from 'react';
import { StyleSheet, View } from 'react-native';

const Joystick = ({ is_landscape }: { is_landscape: boolean }) => {
    return (
        <View style={[styles.joystick_container, is_landscape && styles.joystick_container_landscape]}></View>
    );
};

const styles = StyleSheet.create({
    joystick_container: {
        width: 200,
        height: 200,
        backgroundColor: "#1E293B",
        borderRadius: 100,
    },
    joystick_container_landscape: {
        backgroundColor: 'rgba(30, 41, 59, 0.8)',
        position: 'absolute',
        right: 48,
        bottom: 24,
        padding: 24,
    }
});

export default Joystick;