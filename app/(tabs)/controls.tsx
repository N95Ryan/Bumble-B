import Bandeau from '@/components/Controls/Bandeau';
import Image from '@/components/Controls/Camera';
import Units from '@/components/Controls/Units';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

export default function ControlsPage() {
    const { width, height } = useWindowDimensions();
    const is_landscape = width > height;
    const is_tall = height > 900;

    return (
        <View style={[
                styles.container, 
                is_landscape && styles.container_landscape,
                is_tall && styles.container_tall]}>
            <Bandeau is_landscape={is_landscape} />
            <Image is_landscape={is_landscape} />
            <Units is_landscape={is_landscape} />
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
    },
    container_tall: {
        justifyContent: 'flex-start',
        paddingVertical: 48,
        rowGap: 32,
    }
});