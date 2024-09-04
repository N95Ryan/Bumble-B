import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Units = ({ is_landscape }: { is_landscape: boolean }) => {
    return (
        <View style={[styles.units_container, is_landscape && styles.units_container_landscape]}>
            <View style={styles.unit_content}>
                <Text style={styles.unit_label}>Vitesse</Text>
                <Text style={styles.unit_value}>120 km/h</Text>
            </View>
            <View style={styles.unit_content}>
                <Text style={styles.unit_label}>Distance</Text>
                <Text style={styles.unit_value}>150 km</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    units_container: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 24,
    },
    unit_content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 8,
    },
    unit_label: {
        fontSize: 17,
        color: "#94A3B8",
    },
    unit_value: {
        fontSize: 33,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    units_container_landscape: {
        backgroundColor: 'rgba(2, 6, 23, 0.6)',
        position: 'absolute',
        left: 48,
        bottom: 24,
        padding: 24,
        borderRadius: 32,
    }
});

export default Units;