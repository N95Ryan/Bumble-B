import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { VictoryArea, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory';
import axios from 'axios';

export default function StatsPage() {

    const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJtYXhpbWVtYXhpbWUiLCJpYXQiOjE3MjU2MjY3NzEsImV4cCI6MTcyNTcxMzE3MX0.LM4jU_swMkIQe3a-jinvIG_S9C3rfLJ3EvaqqLJzXBlBkTUImH-TH0ndVXyKcuGM';

    const [graphData, setgraphData] = useState('')
    const getgraphData = () => {
        axios.get('http://localhost:8080/users/1/races', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            //console.log(res.data.content)
            setgraphData(res.data.content)
        }).catch(err => {
            console.log(err)
        })

    }

    const [dataGraph, setDataGraph] = useState([
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 2 },
        { x: 4, y: 4 },
        { x: 5, y: 7 },
    ]);

    return (
        <View style={styles.container}>
            <View style={styles.graphbox}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    width={240}
                    height={170}
                >
                    <VictoryAxis
                        label="Temps (s)"
                        axisLabelComponent={<VictoryLabel />}
                        style={{
                            axis: { stroke: "#000" },
                            axisLabel: { fontSize: 12, padding: 30 },
                            tickLabels: { fontSize: 10, padding: 5 },
                        }}
                    />

                    <VictoryAxis
                        dependentAxis
                        label="Vitesse (m/s)"
                        axisLabelComponent={<VictoryLabel angle={-90} />}
                        style={{
                            axis: { stroke: "#000" },
                            axisLabel: { fontSize: 12, padding: 30 },
                            tickLabels: { fontSize: 10, padding: 5 },
                        }}
                    />

                    <VictoryArea
                        style={{
                            data: { fill: "#000" },
                        }}
                        data={dataGraph}
                    />
                </VictoryChart>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    graphbox: {
        backgroundColor: '#fff',
        width: '50%',
        justifyContent: 'center',
    },
});





























