import Navbar from "@/components/Navbar/Navbar";
import DataChart from "@/components/Stats/DataChart/DataChart";
import GroupWrapper from "@/components/Stats/GroupWrapper";
import Header from "@/components/Stats/Header";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Import correct pour récupérer les paramètres de navigation

const StatsPage: React.FC = () => {
  const [timeSpent, setTimeSpent] = useState<number[]>([]);
  const [distanceCovered, setDistanceCovered] = useState<number[]>([]);
  const [averageSpeed, setAverageSpeed] = useState<number[]>([]);
  const [wheelRotationSpeed, setWheelRotationSpeed] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  // Récupérer la date envoyée depuis HistoryPage
  const { date } = useLocalSearchParams();

  // Si `date` est un tableau, utiliser le premier élément, sinon utiliser la valeur directement
  const filterDate = Array.isArray(date) ? date[0] : date || "2024-09-11";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/users/1/races", {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ1c2VyMiIsImlhdCI6MTcyNTk5NDgyMywiZXhwIjoxNzI2MDgxMjIzfQ.gbiG3jqlGLAShO_THzfJHiCw2H_mUNiB4t29Xz3o4vHvr5QGBawS6aMDefLiKHzB',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        const lastSevenEntries = jsonData.slice(-7);

        // Filtrer les données en fonction de la date passée
        const filteredEntries = lastSevenEntries.filter((stat: any) => {
          const statDate = new Date(stat.createdAt).toISOString().split('T')[0];
          return statDate === filterDate;
        });

        const hours = filteredEntries.map((stat: any) => {
          const date = new Date(stat.createdAt);
          const hour = date.getHours().toString().padStart(2, '0');
          const minutes = date.getMinutes().toString().padStart(2, '0');
          return `${hour}:${minutes}`;
        });

        // Mettre à jour les états avec les données filtrées
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
  }, [filterDate]); // Réexécute l'effet lorsque filterDate change

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
          selectedDate={filterDate} // Passer la date sélectionnée
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
