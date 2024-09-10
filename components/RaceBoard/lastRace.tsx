import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface LastRaceProps {
  races: any[]; // Utilisez un type plus spécifique si possible
}

const LastRace: React.FC<LastRaceProps> = ({ races }) => {
  // Exemple d'affichage des données de la dernière course
  const lastRace = races.length > 0 ? races[0] : null;
  const currentDate = new Date().toLocaleDateString();

  return (
    <View>
      <Text style={style.title}>Dernière course</Text>
      <View style={style.data}>
        {lastRace ? (
          <>
            <Text style={style.date}>
              Date : <Text style={style.datas}>{lastRace.createdAt || currentDate}</Text>
            </Text>
            <Text>
              Temps : <Text style={style.datas}>{lastRace.timeSpent || '15 min'}</Text>
            </Text>
            <Text>
              Distance : <Text style={style.datas}>{lastRace.distanceCovered || '4 km'}</Text>
            </Text>
            <Text>
              Vitesse max : <Text style={style.datas}>{lastRace.averageSpeed || '15 km/h'}</Text>
            </Text>
          </>
        ) : (
          <Text>Aucune course disponible</Text>
        )}
      </View>
      <View>
        <Link href="/history" style={style.link}>
          Voir l’historique des courses
        </Link>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    display: "flex",
    width: 246,
    flexDirection: "column",
    justifyContent: "flex-end",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    color: "#1E293B",
    marginTop: 12,
  },

  data: {
    marginTop: 16,
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    alignSelf: "stretch",
    fontSize: 18,
    fontStyle: "normal",
    fontWeight: "400",
    color: "#1E293B",
  },

  link: {
    display: "flex",
    height: 51,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 24,
    backgroundColor: "#E2E8F0",
    color: "#1E293B",
    textAlign: "center",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: -0.32,
  },

  date: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    color: "black",
  },

  datas: {
    fontWeight: "700",
  },
});

export default LastRace;
