import { StyleSheet, Text, View, StatusBar } from "react-native";
import { COLORS } from "./src/Constants/res/COLORS";
import RootNavigation from "./src/Navigators/RootNavigation";
import React from "react";
import 'react-native-gesture-handler'
export default function App() {
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      <RootNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
