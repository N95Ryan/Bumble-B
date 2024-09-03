import Bandeau from '@/components/Controls/Bandeau';
import Image from '@/components/Controls/Camera';
import Joystick from '@/components/Controls/Joystick';
import Units from '@/components/Controls/Units';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

export default function DashboardPage() {
    const { width, height } = useWindowDimensions();
    const is_landscape = width > height;

    return (
        <View style={[styles.container, is_landscape && styles.container_landscape]}>
            <Bandeau is_landscape={is_landscape} />
            <Image is_landscape={is_landscape} />
            <Units is_landscape={is_landscape} />
            <Joystick is_landscape={is_landscape} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: "#020617",
        paddingVertical: 24,
    },
    container_landscape: {
        position: 'relative'
    }
});
