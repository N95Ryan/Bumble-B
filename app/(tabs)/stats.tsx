import DataChart from "@/components/Stats/DataChart/DataChart";
import GroupWrapper from "@/components/Stats/GroupWrapper";
import Header from "@/components/Stats/Header";
import InputWrapper from "@/components/Stats/InputWrapper";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const StatsPage: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <Header />
        <DataChart />
        <InputWrapper />
        <GroupWrapper />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  wrapper: {
    padding: 24,
    gap: 32,
  },
});

export default StatsPage;
