import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VictoryArea, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory';
import axios from 'axios';

interface RaceData {

  timeSpent: number;
  distanceCovered: number;
  averageSpeed: number;
  wheelRotationSpeed: number;
}

export default function StatsPage() {

  const token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJtYXhpbWUiLCJpYXQiOjE3MjY0MTA2MzQsImV4cCI6MTcyNjQ5NzAzNH0.i6Qk9Cp7LNDihzE0n5q03OlMJg5wm44fNMrA8ceVPVY7g7bdLaOanWa9n7MV4Wyd';

  const [dataGraph, setDataGraph] = useState<{ x: number, y: number }[]>([]);
  const [raceData, setRaceData] = useState<RaceData[] | null>(null);

  const getGraphData = () => {
    axios.get('http://localhost:8080/users/1/races', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (Array.isArray(res.data)) {
          const transformedData = res.data.map((item: RaceData) => ({
            x: item.distanceCovered,
            y: item.averageSpeed,
          }));
          setDataGraph(transformedData);
          setRaceData(res.data);
        }
      })
      .catch(error => {
      });
  }

  useEffect(() => {
    getGraphData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.graphbox}>
        <VictoryChart
          theme={VictoryTheme.material}
          width={240}
          height={170}
        >
          <VictoryAxis
            label="Distance (m)"
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
    padding: 10,
  },
  graphbox: {
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
});