import Navbar from "@/components/Navbar/Navbar";
import DataChart from "@/components/Stats/DataChart/DataChart";
import GroupWrapper from "@/components/Stats/GroupWrapper";
import Header from "@/components/Stats/Header";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

const StatsPage: React.FC = () => {
  const [timeSpent, setTimeSpent] = useState<number[]>([]);
  const [distanceCovered, setDistanceCovered] = useState<number[]>([]);
  const [averageSpeed, setAverageSpeed] = useState<number[]>([]);
  const [wheelRotationSpeed, setWheelRotationSpeed] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  const filterDate = "2024-09-11";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/users/1/races", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJKRCIsImlhdCI6MTcyNjEzMTM0NywiZXhwIjoxNzI2MjE3NzQ3fQ.BXevvVDy45dFshrMweUb_thSFb76Fma-vjAbnkse_wEWBUIdlHQwDHuORgRVZpVC',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        const lastSevenEntries = jsonData.slice(-7);

        // Filter data based on the fixed date
        const filteredEntries = lastSevenEntries.filter((stat: any) => {
          const date = new Date(stat.createdAt).toISOString().split('T')[0];
          return date === filterDate;
        });

        const hours = filteredEntries.map((stat: any) => {
          const date = new Date(stat.createdAt);
          const hour = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hour}:${minutes}`;
        });

        setLabels(hours);
        setTimeSpent(filteredEntries.map((stat: any) => stat.timeSpent));
        setDistanceCovered(filteredEntries.map((stat: any) => stat.distanceCovered));
        setAverageSpeed(filteredEntries.map((stat: any) => stat.averageSpeed));
        setWheelRotationSpeed(filteredEntries.map((stat: any) => stat.wheelRotationSpeed));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filterDate]);


  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Header />
        <DataChart
          timeSpent={timeSpent}
          distanceCovered={distanceCovered}
          averageSpeed={averageSpeed}
          wheelRotationSpeed={wheelRotationSpeed}
          labels={labels}
          selectedDate={filterDate}
        />
        <GroupWrapper
          timeSpent={timeSpent}
          distanceCovered={distanceCovered}
          averageSpeed={averageSpeed}
          wheelRotationSpeed={wheelRotationSpeed}
        />
      </View>
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  wrapper: {
    padding: 24,
    gap: 32,
  },
});

export default StatsPage;
