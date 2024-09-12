import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Navbar from "@/components/Navbar/Navbar";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Interface pour les métriques et les courses
interface Metric {
  label: string;
  value: string;
}

interface Race {
  createdAt: string;
  timeSpent: number;
  distanceCovered: number;
  averageSpeed: number;
  maxSpeed?: number;
}

interface DateCard {
  id: number;
  date: string;
  metrics: Metric[];
  badgeCount: number;
}

// Interface pour le payload JWT
interface JwtPayload {
  sub?: string; // Utiliser 'sub' comme clé si c'est la clé de votre nom d'utilisateur
}

// Fonction pour décoder le token JWT
function parseJwt(token: string) {
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
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(decoded);
  } catch (error) {
    console.error("Erreur lors du décodage du JWT :", error);
    return null;
  }
}

// Fonction pour obtenir les utilisateurs par nom d'utilisateur
const getUsersByUsername = async (username: string, token: string) => {
  try {
    const response = await axios.get('http://localhost:8080/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('Users Response:', response.data);
    // Filtrer les utilisateurs par nom d'utilisateur
    const filteredUsers = response.data.filter((user: any) => user.username === username);
    console.log('Filtered Users:', filteredUsers);
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
    console.log('Races Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Races Error:', error);
    return [];
  }
};

const HistoryPage: React.FC = () => {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [dateCards, setDateCards] = useState<DateCard[]>([]);
  const [username, setUsername] = useState<string>("");

  // Fonction pour récupérer les données d'historique des courses
  const fetchHistoryData = async () => {
    try {
      const token = await AsyncStorage.getItem("jwt_token");
      console.log("Token récupéré depuis AsyncStorage:", token);

      if (token) {
        // Décoder le token JWT pour extraire le nom d'utilisateur
        const decodedToken = parseJwt(token) as JwtPayload;
        const userName = decodedToken?.sub || "Inconnu";
        setUsername(userName);

        // Obtenir l'utilisateur correspondant
        const users = await getUsersByUsername(userName, token);
        const user = users[0]; // On suppose qu'il n'y a qu'un seul utilisateur avec ce nom

        if (user) {
          // Obtenir les courses de l'utilisateur
          const userRaces: Race[] = await getRacesById(user.id, token);

          // Regrouper les données par date
          const groupedData = userRaces.reduce((acc: { [key: string]: Race[] }, item: Race) => {
            const dateKey = format(new Date(item.createdAt), 'd MMMM', { locale: fr });
            if (!acc[dateKey]) {
              acc[dateKey] = [];
            }
            acc[dateKey].push(item);
            return acc;
          }, {});

          // Formater les données pour les adapter au format de dateCards
          const formattedData = Object.entries(groupedData).map(([date, items], index) => {
            const metrics = items.flatMap((item: Race) => ([
              { label: "Temps", value: `${item.timeSpent.toFixed(2)} min` },
              { label: "Distance", value: `${item.distanceCovered.toFixed(2)} km` },
              { label: "Vitesse max", value: `${item.averageSpeed.toFixed(2)} km/h` },
            ]));

            return {
              id: index,
              date: date,
              metrics: metrics,
              badgeCount: items.length,
            };
          });

          setDateCards(formattedData);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données historiques :", error);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleStatsClick = (id: number, date: string) => {
    // Formater la date au format ISO pour la passer à StatsPage
    const isoDate = format(new Date(date), 'yyyy-MM-dd'); 
    // Naviguer vers la page des statistiques en passant la date comme paramètre
    router.push({
      pathname: "/stats",
      params: { date: isoDate },
    });
  };

  const handleDeleteClick = (id: number) => {
    setDateCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  return (
    <>
      <View style={styles.historique}>
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/dashboard")}>
            <Image
              style={styles.backIcon}
              resizeMode="cover"
              source={require("../../assets/images/flèche.png")}
            />
          </Pressable>
          <View style={styles.headerTextContainer}>
            <Text style={styles.historiqueTitle}>Historique des courses</Text>
            <Text style={styles.subtitle}>
              Retrouvez ici vos dernières courses, ainsi que vos statistiques.
            </Text>
          </View>
        </View>

        <View style={styles.dateSection}>
          {dateCards.map((card) => (
            <View key={card.id} style={styles.dateCard}>
              <Pressable
                style={styles.dateHeaderContainer}
                onPress={() => toggleCard(card.id)}
              >
                <View style={styles.dateHeader}>
                  <Image
                    style={styles.icon}
                    resizeMode="cover"
                    source={require("../../assets/images/bas.png")}
                  />
                  <Text style={styles.dateText}>{card.date}</Text>
                  {card.badgeCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{card.badgeCount}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.dateIcons}>
                  <Pressable onPress={() => handleStatsClick(card.id, card.date)}>
                    <Image
                      style={styles.icon}
                      resizeMode="cover"
                      source={require("../../assets/images/stats.png")}
                    />
                  </Pressable>
                  <Pressable onPress={() => handleDeleteClick(card.id)}>
                    <Image
                      style={styles.icon}
                      resizeMode="cover"
                      source={require("../../assets/images/poubelle.png")}
                    />
                  </Pressable>
                </View>
              </Pressable>
              {expandedCard === card.id && (
                <View style={styles.metrics}>
                  {card.metrics.map((metric, index) => (
                    <View key={index}>
                      <View style={styles.metricRow}>
                        <Text style={styles.metricText}>{metric.label} :</Text>
                        <Text style={styles.metricValue}>{metric.value}</Text>
                      </View>
                      {/* Ajout de la ligne de séparation après la vitesse max */}
                      {metric.label === "Vitesse max" && <View style={styles.separator} />}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </View>
      <Navbar />
    </>
  );
};


const styles = StyleSheet.create({
  historique: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 150,
    gap: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  backIcon: {
    width: 24,
    height: 24,
  },

  headerTextContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },

  historiqueTitle: {
    fontSize: 33,
    color: "#020617",
    fontWeight: "700",
  },

  subtitle: {
    color: "#64748b",
    fontSize: 18,
  },

  dateSection: {
    flexDirection: "column",
    gap: 24,
  },

  dateCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 24,
  },

  dateHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },

  dateHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 2,
  },

  dateText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1e293b",
    marginHorizontal: 8,
  },

  badge: {
    backgroundColor: "#cbd5e1",
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  badgeText: {
    fontSize: 18,
    color: "#1e293b",
    marginVertical: 1,
  },

  dateIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  metrics: {
    marginVertical: 8,
    flexDirection: "column",
    gap: 12,
  },

  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  metricText: {
    fontSize: 18,
    color: "#1e293b",
    marginRight: 8, // Espace entre le label et la valeur
  },

  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },

  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 8,
  },
});

export default HistoryPage;
