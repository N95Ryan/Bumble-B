import Header from "@/components/Modes/Header";
import ModeSelector from "@/components/Modes/ModeSelector";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Navbar from "@/components/Navbar/Navbar";

export default function ModesPage() {
  const [selectedMode, setSelectedMode] = useState<"guided" | "manual" | null>(
    null
  );
  const router = useRouter();

  const handlePress = () => {
    if (selectedMode) router.push(`/controls?mode=${selectedMode}`);
  };

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
