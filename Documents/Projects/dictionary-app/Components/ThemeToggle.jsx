import React, { useState } from "react";
import { Switch, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme();
  const isEnabled = themeName === "dark";

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleTheme}
          value={isEnabled}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default ThemeToggle;
