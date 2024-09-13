import Header from "@/components/Modes/Header";
import ModeSelector from "@/components/Modes/ModeSelector";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "@/components/Navbar/Navbar";
import { sendCommand } from "../../src/js/websocket";
import { activerModeGuide, desactivermodeGuide } from "@/src/js/guidedMode";

export default function ModesPage() {
  desactivermodeGuide();

  const [selectedMode, setSelectedMode] = useState<"guided" | "manual" | null>(
    null
  );
  const router = useRouter();

  const handlePress = () => {
    if (selectedMode) {
      router.push(`/controls?mode=${selectedMode}`);
      modeDeLaVoiture(selectedMode);
    }
  };

  function modeDeLaVoiture(selectedMode: string) {
    if (selectedMode === "manual") {
      sendCommand(10, 0);
      console.log("Mode manuel activé");
      desactivermodeGuide();
    } else if (selectedMode === "guided") {
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
