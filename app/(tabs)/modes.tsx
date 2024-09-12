import Header from "@/components/Modes/Header";
import ModeSelector from "@/components/Modes/ModeSelector";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "@/components/Navbar/Navbar";
import { sendCommand } from '../../src/js/websocket';
import { activerModeGuide, desactivermodeGuide } from "@/src/js/guidedMode";

export default function ModesPage() {

  // pour empecher que le mode guidé soit toujours activé quand on quitte la page
  desactivermodeGuide();

  const [selectedMode, setSelectedMode] = useState<"guided" | "manual" | null>(null);
  const router = useRouter();



  const handlePress = () => {
    if (selectedMode) {
      router.push(`/controls?mode=${selectedMode}`);
      // défini le mode de la voiture et envoi les commandes correspondantes
      modeDeLaVoiture(selectedMode);
    }
  };

  function modeDeLaVoiture(selectedMode: string) {
    // si on clique sur manual, on envoie cmd 10, 0 ce qui active le mode manuel
    if (selectedMode === "manual") {
      sendCommand(10, 0);
      desactivermodeGuide();
      // si on clique sur guided, on envoie cmd 10,1 ce qui active le suivi de ligne
    } else if(selectedMode === "guided") {
        activerModeGuide();
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Header />
        <ModeSelector
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          handlePress={handlePress}
        />
      </View>
      <Navbar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#F1F5F9",
    padding: 24,
    overflow: "scroll",
  },
});
