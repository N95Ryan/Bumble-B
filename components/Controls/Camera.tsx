import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Camera = ({ is_landscape }: { is_landscape: boolean }) => {
    return (
        <Image 
            style={[styles.camera, is_landscape && styles.camera_landscape]}
            source={
                is_landscape
                    ? require("../../assets/images/fake_course_horizontal.png")
                    : require("../../assets/images/fake_course_vertical.png")
            }
        />
    );
};

const styles = StyleSheet.create({
    camera: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    camera_landscape: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: -1,
        width: '100%',
        height: "100%",
    }
});

export default Camera;