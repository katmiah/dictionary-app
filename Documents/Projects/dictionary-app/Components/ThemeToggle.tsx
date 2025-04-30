import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";

interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function ThemeToggle({
  isDarkMode,
  onToggle,
}: ThemeToggleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dark Mode</Text>
      <Switch value={isDarkMode} onValueChange={onToggle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
});
