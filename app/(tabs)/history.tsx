import React, { useState } from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { useRouter } from 'expo-router';

const Historique: React.FC = () => {
  const router = useRouter(); // Hook pour accéder à l'historique

  // État pour gérer l'expansion des blocs
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // État pour gérer la liste des blocs
  const [dateCards, setDateCards] = useState([
    { id: 0, date: "6 juin", metrics: [], badgeCount: 0 },
    { id: 1, date: "4 juin", metrics: [{ label: "Temps", value: "15 mn" }, { label: "Distance", value: "4 km" }, { label: "Vitesse max", value: "15 km/h" }], badgeCount: 2 },
    { id: 2, date: "31 mai", metrics: [{ label: "Temps", value: "15 mn" }, { label: "Distance", value: "4 km" }, { label: "Vitesse max", value: "15 km/h" }], badgeCount: 5 },
  ]);

  const toggleCard = (index: number) => {
    // Alterner l'état d'expansion pour le bloc cliqué
    setExpandedCard(expandedCard === index ? null : index);
  };

  const handleStatsClick = (id: number) => {
    // Navigation vers la page des statistiques
    router.push('/statistiques');
  };

  const handleDeleteClick = (id: number) => {
    // Supprimer le bloc
    setDateCards(prevCards => prevCards.filter(card => card.id !== id));
  };

  return (
    <View style={styles.historique}>
      {/* Header Section */}
      <View style={styles.header}>
        <Pressable onPress={() => router.push('/dashboard')}>
          <Image
            style={styles.backIcon}
            resizeMode="cover"
            source={require("../../assets/images/flèche.png")}
          />
        </Pressable>
        <View style={styles.headerTextContainer}>
          <Text style={styles.historiqueTitle}>Historique des courses</Text>
          <Text style={styles.subtitle}>
            Retrouver vos courses ici et leurs statistiques
          </Text>
        </View>
      </View>

      {/* Dates Section */}
      <View style={styles.dateSection}>
        {dateCards.map((card) => (
          <View key={card.id} style={styles.dateCard}>
            <Pressable style={styles.dateHeader} onPress={() => toggleCard(card.id)}>
              <View style={styles.dateHeaderLeft}>
                <Image
                  style={styles.iconSmall}
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
                <Pressable onPress={() => handleStatsClick(card.id)}>
                  <Image
                    style={styles.iconSmall}
                    resizeMode="cover"
                    source={require("../../assets/images/stats.png")}
                  />
                </Pressable>
                <Pressable onPress={() => handleDeleteClick(card.id)}>
                  <Image
                    style={[styles.iconSmall, styles.iconRight]}
                    resizeMode="cover"
                    source={require("../../assets/images/poubelle.png")}
                  />
                </Pressable>
              </View>
            </Pressable>
            {/* Afficher ou masquer les informations en fonction de l'état */}
            {expandedCard === card.id && card.date !== "6 juin" && (
              <>
                <View style={styles.metrics}>
                  {card.metrics.map((metric, index) => (
                    <View key={index} style={styles.metricRow}>
                      <Text style={styles.metricText}>{metric.label}</Text>
                      <Text style={styles.metricValue}>{metric.value}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.separator} />

                <View style={styles.metrics}>
                  {card.metrics.map((metric, index) => (
                    <View key={index} style={styles.metricRow}>
                      <Text style={styles.metricText}>{metric.label}</Text>
                      <Text style={styles.metricValue}>{metric.value}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        ))}
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
  dateCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 24,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconSmall: {
    width: 24,
    height: 24,
  },
  iconRight: {
    marginLeft: 10, // Adds space between icons
  },
  dateText: {
    fontSize: 25,
    fontWeight: "700",
    color: "#1e293b",
  },
  badge: {
    backgroundColor: "#cbd5e1",
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 17,
    color: "#1e293b",
  },
  dateIcons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  metrics: {
    marginTop: 16,
    flexDirection: "column",
    gap: 16,
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricText: {
    fontSize: 18,
    color: "#1e293b",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 16,
  },
});

export default Historique;
