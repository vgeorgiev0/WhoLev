import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigator from "./src/navigation/index";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Navigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
