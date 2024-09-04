import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ModeOption from './ModeOption';

type ModeSelectorProps = {
    selectedMode: 'guided' | 'manual' | null;
    setSelectedMode: (mode: 'guided' | 'manual') => void;
    handlePress: () => void;
};
const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, setSelectedMode, handlePress }) => {
    return (
        <View style={styles.container_mode}>
            <ModeOption
                mode="guided"
                isSelected={selectedMode === 'guided'}
                onPress={() => setSelectedMode('guided')}
                iconSource={require("../../assets/images/icon_guide_mode.svg")}
                title="Mode guidé"
                description="Avec le mode guidé, la voiture se déplace automatiquement, vous aurez accès à la caméra et les données."
            />
            <ModeOption
                mode="manual"
                isSelected={selectedMode === 'manual'}
                onPress={() => setSelectedMode('manual')}
                iconSource={require("../../assets/images/icon_manuel_mode.svg")}
                title="Mode manuel"
                description="Avec le mode manuel, vous contrôlez entièrement la voiture avec la caméra, le joystick, et les données intégrées."
            />
            <TouchableOpacity
                style={styles.button_mode}
                onPress={handlePress}
                disabled={!selectedMode}
            >
                <Text style={styles.button_text_mode}>Démarrer</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container_mode: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        rowGap: 24,
        width: '100%',
    },
    button_mode: {
        alignSelf: 'center',
        borderRadius: 24,
        padding: 16,
        backgroundColor: "#FDE047",
        marginTop: 24,
    },
    button_text_mode: {
        fontSize: 20,
        fontWeight: "medium",
        color: "#713F12",
    },
});

export default ModeSelector;
