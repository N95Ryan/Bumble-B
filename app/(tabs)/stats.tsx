import * as React from "react";
import { Image, StyleSheet, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router"; // Importation du hook useRouter
import Navbar from "@/components/Navbar/Navbar";

const StatsPage: React.FC = () => {
  const router = useRouter(); // Initialisation du router

  return (
    <>
      <View style={[styles.container, styles.iconLayout]}>
        <View style={styles.frameParent}>
          {/* Redirection lors du clic sur l'image */}
          <Pressable
            style={styles.frameIconLayout}
            onPress={() => router.push("/history")} // Redirection vers la page History
          >
            <Image
              style={[styles.icon, styles.iconLayout]}
              resizeMode="cover"
              source={require("../../assets/images/flèche.png")} // Utilisation de require pour les images locales
            />
          </Pressable>
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Statistiques</Text>
            <Text style={styles.statsSubtitle}>
              Retrouvez vos courses ici et leurs statistiques
            </Text>
          </View>
          <View style={[styles.frameGroup, styles.inputFlexBox]}></View>
        </View>
        <View style={[styles.frameContainer, styles.tempsSParentFlexBox]}>
          <View style={styles.tempsSParentFlexBox}>
            <Text style={[styles.tempsS, styles.tempsSTypo]}>Temps (s)</Text>
            <Text style={[styles.vitesseMs, styles.vitesseMsPosition]}>
              Vitesse (m/s)
            </Text>
            <View style={styles.dateButton}>
              <View style={[styles.jourWrapper, styles.wrapperFlexBox]}>
                <Text style={[styles.jour, styles.jourTypo]}>Jour</Text>
              </View>
              <Pressable style={styles.wrapperFlexBox} onPress={() => {}}>
                <Text style={[styles.semaine, styles.mnTypo]}>Semaine</Text>
              </Pressable>
              <View style={styles.wrapperFlexBox}>
                <Text style={[styles.semaine, styles.mnTypo]}>Mois</Text>
              </View>
            </View>
            <Image
              style={styles.frameItem}
              resizeMode="cover"
              source={require("../../assets/images/Tableau.png")}
            />
          </View>
          <View style={[styles.inputWrapper, styles.tempsSParentFlexBox]}>
            <View style={[styles.input, styles.inputFlexBox]}>
              <View style={styles.frameWrapper}>
                <Image
                  style={[styles.frameIcon1, styles.frameIconLayout]}
                  resizeMode="cover"
                  source={require("../../assets/images/Calendrier.png")}
                />
              </View>
              <View style={styles.parent}>
                <Text style={[styles.text, styles.jourTypo]}>31</Text>
                <Text style={[styles.text, styles.jourTypo]}>Mai</Text>
                <Text style={[styles.text, styles.jourTypo]}>2024</Text>
              </View>
            </View>
          </View>
          <View style={styles.groupWrapper}>
            <View style={styles.groupView}>
              <View style={[styles.frameParent1, styles.vitesseMsPosition]}>
                <View style={styles.frameParent2}>
                  <View style={styles.frameParent3}>
                    <Text style={[styles.temps, styles.mnTypo]}>Temps</Text>
                  </View>
                  <Text style={[styles.mn, styles.mnTypo]}>15 mn</Text>
                </View>
                <View style={styles.frameParent2}>
                  <View style={styles.frameParent3}>
                    <Text style={[styles.temps, styles.mnTypo]}>
                      Distance parcourue
                    </Text>
                  </View>
                  <Text style={[styles.mn, styles.mnTypo]}>4 km</Text>
                </View>
                <View style={styles.frameParent2}>
                  <View style={styles.frameParent3}>
                    <Text style={[styles.temps, styles.mnTypo]}>
                      Vitesse moyenne
                    </Text>
                  </View>
                  <Text style={[styles.mn, styles.mnTypo]}>15 km/h</Text>
                </View>
                <View style={styles.frameParent2}>
                  <View style={styles.frameParent3}>
                    <Text style={[styles.temps, styles.mnTypo]}>
                      Vitesse de rotation des roues
                    </Text>
                  </View>
                  <Text style={[styles.mn, styles.mnTypo]}>15 tr/s</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Navbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1F5F9",
    height: 926,
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 150,
    gap: 32,
    alignItems: "center",
    overflow: "hidden",
    flex: 1,
  },

  statsContainer: {
    gap: 8,
    flex: 1,
  },

  statsTitle: {
    fontSize: 33,
    color: "#020617",
    textAlign: "left",
    fontWeight: "700",
    alignSelf: "stretch",
  },

  statsSubtitle: {
    color: "#64748b",
    fontSize: 18,
    textAlign: "left",
    alignSelf: "stretch",
  },

  dateButton: {
    backgroundColor: "#cbd5e1",
    padding: 4,
    zIndex: 1,
    borderRadius: 24,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },

  jourTypo: {
    color: "#3b82f6",
    fontSize: 18,
    fontWeight: "700",
  },

  semaine: {
    textAlign: "left",
    fontWeight: "700",
    color: "#1e293b",
  },

  iconLayout: {
    width: "100%",
    overflow: "hidden",
  },

  inputFlexBox: {
    gap: 16,
    flexDirection: "row",
  },

  tempsSParentFlexBox: {
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },

  tempsSTypo: {
    fontSize: 9,
    textAlign: "center",
    color: "#64748b",
  },

  vitesseMsPosition: {
    left: 0,
    position: "absolute",
  },

  wrapperFlexBox: {
    padding: 8,
    width: 100,
    justifyContent: "center",
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
  },

  mnTypo: {
    color: "#1e293b",
    fontSize: 18,
  },
  frameIconLayout: {
    height: 24,
    width: 24,
  },

  icon: {
    height: "100%",
    overflow: "hidden",
  },

  frameChild: {
    borderRadius: 100,
    width: 48,
    height: 48,
    overflow: "hidden",
  },

  frameIcon: {
    width: 52,
    height: 52,
    overflow: "hidden",
  },

  frameGroup: {
    display: "none",
  },

  frameParent: {
    gap: 24,
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },

  tempsS: {
    marginLeft: -19,
    top: 271,
    left: "50%",
    zIndex: 3,
    textAlign: "center",
    position: "absolute",
    fontSize: 9,
  },

  vitesseMs: {
    marginTop: 25,
    top: "50%",
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    zIndex: 2,
    textAlign: "center",
    fontSize: 9,
    color: "#64748b",
    fontFamily: "Helvetica Neue",
  },

  jour: {
    textAlign: "left",
  },

  jourWrapper: {
    backgroundColor: "#fff",
  },

  frameItem: {
    borderRadius: 4,
    width: 352,
    height: 248,
    zIndex: 0,
    marginTop: -24,
    overflow: "hidden",
  },

  frameIcon1: {
    overflow: "hidden",
  },

  frameWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    textAlign: "center",
  },
  parent: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: "center",
    overflow: "hidden",
  },
  inputWrapper: {
    borderRadius: 32,
    paddingHorizontal: 8,
    paddingTop: 16,
    flexDirection: "row",
  },
  frameIcon2: {
    display: "none",
    overflow: "hidden",
  },
  temps: {
    textAlign: "center",
  },
  frameParent3: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  mn: {
    textAlign: "center",
    fontWeight: "700",
    color: "#1e293b",
  },
  frameParent2: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
  },
  frameParent1: {
    top: 0,
    gap: 10,
    width: 316,
  },
  groupView: {
    height: 118,
    width: 316,
  },
  groupWrapper: {
    paddingLeft: 24,
    paddingTop: 24,
    paddingRight: 32,
    paddingBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 24,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  frameContainer: {
    borderRadius: 24,
    gap: 24,
  },
});

export default StatsPage;
