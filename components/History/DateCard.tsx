import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';


interface Metric {
  label: string;
  value: string;
}

interface DateCardProps {
  id: number;
  date: string;
  metrics: Metric[];
  badgeCount: number;
  expanded: boolean;
  onToggle: () => void;
  onStatsClick: () => void;
  onDeleteClick: () => void;
}

const DateCard: React.FC<DateCardProps> = ({ id, date, metrics, badgeCount, expanded, onToggle, onStatsClick, onDeleteClick }) => {
  return (
    <View style={styles.dateCard}>
      <Pressable style={styles.dateHeaderContainer} onPress={onToggle}>
        <View style={styles.dateHeader}>
          <Image style={styles.icon} resizeMode="cover" source={require('../../assets/images/bas.png')} />
          <Text style={styles.dateText}>{date}</Text>
          {badgeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeCount}</Text>
            </View>
          )}
        </View>
        <View style={styles.dateIcons}>
          <Pressable onPress={onStatsClick}>
            <Image style={styles.icon} resizeMode="cover" source={require('../../assets/images/stats.png')} />
          </Pressable>
          <Pressable onPress={onDeleteClick}>
            <Image style={styles.icon} resizeMode="cover" source={require('../../assets/images/poubelle.png')} />
          </Pressable>
        </View>
      </Pressable>
      {expanded && (
        <View style={styles.metrics}>
          {metrics.map((metric, index) => (
            <View key={index}>
              <View style={styles.metricRow}>
                <Text style={styles.metricText}>{metric.label} :</Text>
                <Text style={styles.metricValue}>{metric.value}</Text>
              </View>
              {metric.label === 'Vitesse max' && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // Styles copiés depuis votre code original
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
    marginRight: 8,
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

export default DateCard;
