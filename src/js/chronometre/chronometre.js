import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TimerControls from './TimerControls'; 

const Chronometre = forwardRef((props, ref) => {
    // On le met a true pour qu'il commence dès que la page est ouverte
    const [isRunning, setIsRunning] = useState(true);
    // On met le chrono a 0
    const [time, setTime] = useState(0);
    const timeRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            timeRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(timeRef.current);
        }
        return () => {
            clearInterval(timeRef.current);
        };
    }, [isRunning]);

    useImperativeHandle(ref, () => ({
        stop: () => {
            setIsRunning(false);
        },
        restart: () => {
            setTime(0);
            setIsRunning(true);
        },
        getTime: () => time,  
    }));

    const handleStart = () => {
        setIsRunning(true);
        if (props.onStart) props.onStart();
    };

    const handleStop = () => {
        setIsRunning(false);
        if (props.onStop) props.onStop();
    };

    const handleRestart = () => {
        setTime(0);
        if (isRunning) {
            clearInterval(timeRef.current);
            timeRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        }
        if (props.onRestart) props.onRestart();
    };

    const formatTime = () => {
        const minutes = Math.floor(time / 60).toString().padStart(2, '0');
        const seconds = (time % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    return (
        <View style={styles.chronometreContainer}>
            <Text style={styles.timeText}>{formatTime()}</Text>
            <TimerControls
                onStart={handleStart}
                onStop={handleStop}
                onRestart={handleRestart}
                isRunning={isRunning}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    chronometreContainer: {
        alignItems: 'center',
    },
    timeText: {
        fontSize: 33,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default Chronometre;
