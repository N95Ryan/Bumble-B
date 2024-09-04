import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ModeOptionProps = {
    mode: 'guided' | 'manual';
    isSelected: boolean;
    onPress: () => void;
    iconSource: any;
    title: string;
    description: string;
};

const ModeOption: React.FC<ModeOptionProps> = ({ mode, isSelected, onPress, iconSource, title, description }) => {
    return (
        <TouchableOpacity
            style={[styles.content_mode, isSelected && styles.selected_mode]}
            onPress={onPress}
        >
            <View style={styles.icon_title_mode}>
                <Image 
                    style={styles.icon}
                    source={iconSource}
                />
                <Text style={styles.title_mode}>{title}</Text>
            </View>
            <Text style={styles.text_mode}>{description}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    content_mode: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#FFFFFF",
        rowGap: 24,
        borderRadius: 24,
        padding: 24,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        width: '100%',
    },
    selected_mode: {
        borderColor: '#3B82F6',
    },
    icon_title_mode: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16,
    },
    title_mode: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#1E293B",
    },
    text_mode: {
        fontSize: 18,
        color: "#64748B",
    },
    icon: {
        resizeMode: 'contain',
    },
});

export default ModeOption;
