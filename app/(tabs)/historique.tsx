import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Définir un type pour les objets `Run`
interface Run {
  time: string;
  distance: string;
  speed: string;
}

// Définir un type pour les objets `DataItem`
interface DataItem {
  date: string;
  runs: Run[];
}

// Définir les types de routes disponibles
type RootStackParamList = {
  Home: undefined;
  Car: undefined;
  Document: undefined;
  Stats: undefined;
  Settings: undefined;
  History: undefined;
};

// Créer un tableau de données typé
const data: DataItem[] = [
  {
    date: '6 juin',
    runs: [],
  },
  {
    date: '4 juin',
    runs: [
      { time: '15 mn', distance: '4 km', speed: '15 km/h' },
      { time: '15 mn', distance: '4 km', speed: '15 km/h' },
    ],
  },
  {
    date: '31 mai',
    runs: [],
  },
];

export default function HistoryPage() {
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const toggleExpand = (date: string) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  const renderItem: ListRenderItem<DataItem> = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => toggleExpand(item.date)} style={styles.dateHeader}>
        <View style={styles.dateRow}>
          <Ionicons
            name={expandedDate === item.date ? "chevron-down-outline" : "chevron-forward-outline"}
            size={20}
            color="#6B7280"
          />
          <Text style={styles.dateText}>{item.date}</Text>
          {item.runs.length > 0 && (
            <View style={styles.runCountContainer}>
              <Text style={styles.runCountText}>{item.runs.length}</Text>
            </View>
          )}
        </View>
        <View style={styles.iconsContainer}>
          <Ionicons name="stats-chart-outline" size={24} color="#9C5FFF" style={styles.icon} />
          <Ionicons name="trash-outline" size={24} color="#FF6B6B" style={styles.icon} />
        </View>
      </TouchableOpacity>
      {expandedDate === item.date && item.runs.length > 0 && (
        <View style={styles.detailsContainer}>
          {item.runs.map((run: Run, index: number) => (
            <View key={index} style={styles.runDetail}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Temps</Text>
                <Text style={styles.detailValue}>{run.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Distance</Text>
                <Text style={styles.detailValue}>{run.distance}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Vitesse max</Text>
                <Text style={styles.detailValue}>{run.speed}</Text>
              </View>
              {index < item.runs.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Historique des courses</Text>
      </View>
      <Text style={styles.subtitle}>Retrouver vos courses ici et leurs statistiques</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={28} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Car')}>
          <Ionicons name="car-outline" size={28} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Document')}>
          <Ionicons name="document-text-outline" size={28} color="#2563EB" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Stats')}>
          <Ionicons name="bar-chart-outline" size={28} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={28} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F1F5F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 12,
  },
  detailsContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  runDetail: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  runCountContainer: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
  },
  runCountText: {
    fontSize: 12,
    color: '#111827',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 16,
  },
});
