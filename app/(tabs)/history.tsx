import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUsersByUsername, getRacesById, deleteRacesByDate, parseJwt } from '@/components/History/Api';
import DateCard from '@/components/History/DateCard';
import Navbar from '@/components/Navbar/Navbar';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Race {
  createdAt: string;
  timeSpent: number;
  distanceCovered: number;
  averageSpeed: number;
}

interface DateCardData {
  id: number;
  date: string;
  metrics: Array<{ label: string; value: string }>;
  badgeCount: number;
}

const HistoryPage: React.FC = () => {
  const router = useRouter();
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [dateCards, setDateCards] = useState<DateCardData[]>([]);
  const [username, setUsername] = useState<string>('');

  const fetchHistoryData = async () => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (token) {
        const decodedToken = parseJwt(token);
        const userName = decodedToken?.sub || 'Inconnu';
        setUsername(userName);

        const users = await getUsersByUsername(userName, token);
        const user = users[0];

        if (user) {
          const userRaces: Race[] = await getRacesById(user.id, token);
          const groupedData = userRaces.reduce((acc: { [key: string]: Race[] }, item: Race) => {
            const dateKey = format(new Date(item.createdAt), 'd MMMM', { locale: fr });
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(item);
            return acc;
          }, {});

          const formattedData = Object.entries(groupedData).map(([date, items], index) => {
            const metrics = items.flatMap((item) => ([
              { label: 'Temps', value: `${item.timeSpent.toFixed(2)} min` },
              { label: 'Distance', value: `${item.distanceCovered.toFixed(2)} km` },
              { label: 'Vitesse max', value: `${item.averageSpeed.toFixed(2)} km/h` },
            ])).filter(Boolean);

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
      console.error('Erreur lors de la récupération des données historiques :', error);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  }, []);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleStatsClick = (date: string) => {
    const isoDate = format(parse(date, 'd MMMM', new Date(), { locale: fr }), 'yyyy-MM-dd');
    router.push({ pathname: '/stats', params: { date: isoDate } });
  };

  const handleDeleteClick = async (date: string) => {
    try {
      const token = await AsyncStorage.getItem('jwt_token');
      if (token) {
        await deleteRacesByDate(date, token);
        fetchHistoryData();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression des courses :', error);
    }
  };

  return (
    <View style={styles.historique}>
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/dashboard')}>
          <Image style={styles.backIcon} resizeMode="cover" source={require('../../assets/images/flèche.png')} />
        </Pressable>
        <View style={styles.headerTextContainer}>
          <Text style={styles.historiqueTitle}>Historique des courses</Text>
          <Text style={styles.subtitle}>Retrouvez ici vos dernières courses, ainsi que vos statistiques.</Text>
        </View>
      </View>
      <View style={styles.dateSection}>
        {dateCards.map((card) => (
          <DateCard
            key={card.id}
            id={card.id}
            date={card.date}
            metrics={card.metrics}
            badgeCount={card.badgeCount}
            expanded={expandedCard === card.id}
            onToggle={() => toggleCard(card.id)}
            onStatsClick={() => handleStatsClick(card.date)}
            onDeleteClick={() => handleDeleteClick(card.date)}
          />
        ))}
      </View>
      <View style={styles.navbarContainer}>
        <Navbar />
      </View>
    </View>
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
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000, 
  },
});

export default HistoryPage;
