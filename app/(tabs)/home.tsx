import { View, StyleSheet } from "react-native";
import { HeaderBlockHome } from "@/components/HeaderBlocks/HeaderBlockHome";
import { HomeButtons } from "@/components//Buttons/HomeButtons";

export default function Homepage(){

  return (
    <View style={styles.container}>
      <HeaderBlockHome />
      <HomeButtons />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
});