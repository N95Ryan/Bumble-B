import Navbar from "@/components/Navbar/Navbar";
import DataChart from "@/components/Stats/DataChart/DataChart";
import GroupWrapper from "@/components/Stats/GroupWrapper";
import Header from "@/components/Stats/Header";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { format } from 'date-fns'; // Ajoute ce module si ce n'est pas encore fait
import { useLocalSearchParams } from "expo-router";

interface Race {
  createdAt: string;
  timeSpent: number;
  distanceCovered: number;
  averageSpeed: number;
  wheelRotationSpeed: number;
}

interface JwtPayload {
  sub?: string; // Utiliser 'sub' comme clé si c'est la clé de votre nom d'utilisateur
}

// Fonction pour décoder le token JWT
const parseJwt = (token: string): JwtPayload | null => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) {
      throw new Error("Invalid token format");
    }

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);

    // Ajout du support pour UTF-8
    const decoded = decodeURIComponent(
      jsonPayload
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(decoded);
  } catch (error) {
    console.error("Erreur lors du décodage du JWT :", error);
    return null;
  }
};

// Fonction pour obtenir les utilisateurs par nom d'utilisateur
const getUsersByUsername = async (username: string, token: string) => {
  try {
    const response = await axios.get('http://localhost:8080/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const filteredUsers = response.data.filter((user: any) => user.username === username);
    return filteredUsers;
  } catch (error) {
    console.error('Get Users Error:', error);
    return [];
  }
};

// Fonction pour obtenir les courses d'un utilisateur par ID
const getRacesById = async (userId: string, token: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}/races`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Get Races Error:', error);
    return [];
  }
};

const StatsPage: React.FC = () => {
  const { date } = useLocalSearchParams();
  const initialDate = Array.isArray(date) ? date[0] : date || "";
  const [filterDate, setFilterDate] = useState<string>(initialDate || format(new Date(), 'yyyy-MM-dd'));
  const [timeSpent, setTimeSpent] = useState<number[]>([]);
  const [distanceCovered, setDistanceCovered] = useState<number[]>([]);
  const [averageSpeed, setAverageSpeed] = useState<number[]>([]);
  const [wheelRotationSpeed, setWheelRotationSpeed] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("jwt_token");
        if (token) {
          const decodedToken = parseJwt(token);
          const userName = decodedToken?.sub || "";
          const users = await getUsersByUsername(userName, token);
          const user = users[0];
          
          if (user) {
            const races = await getRacesById(user.id, token);
            const lastSevenEntries = races.slice(-7);

            // Filtrer les données en fonction de la date sélectionnée
            const filteredEntries = lastSevenEntries.filter((stat: Race) => {
              const date = new Date(stat.createdAt).toISOString().split('T')[0];
              return date === filterDate;
            });

            const hours = filteredEntries.map((stat: Race) => {
              const date = new Date(stat.createdAt);
              const hour = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');
              return `${hour}:${minutes}`;
            });

            setLabels(hours);
            setTimeSpent(filteredEntries.map((stat: Race) => stat.timeSpent));
            setDistanceCovered(filteredEntries.map((stat: Race) => stat.distanceCovered));
            setAverageSpeed(filteredEntries.map((stat: Race) => stat.averageSpeed));
            setWheelRotationSpeed(filteredEntries.map((stat: Race) => stat.wheelRotationSpeed));
          }
        }
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
