import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import axios from "axios";
import ThemeToggle from "./Components/ThemeToggle.jsx";
import { ThemeProvider, useTheme } from "./Components/ThemeContext.jsx";
import AudioPlayer from "./Components/Audio.jsx";
import { Button } from "react-native-elements";

const AppContent = () => {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const { theme, themeName } = useTheme();

  const searchWord = async () => {
    setError("");
    setResult(null);
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setResult(response.data[0]);
    } catch (error) {
      setError("Word not found. Try another.");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <StatusBar
        barStyle={themeName === "dark" ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      <Text style={[styles.title, { color: theme.text }]}>
        Welcome to my Dictionary App!
      </Text>

      <ThemeToggle />

      <Image
        style={styles.homeImage}
        source={{
          uri: "https://cdn.pixabay.com/photo/2015/05/25/14/53/book-783394_1280.png",
        }}
      />

      <TextInput
        style={[
          styles.input,
          {
            color: theme.text || "#fff",
            backgroundColor: theme.inputBackground || "#f9f9f9",
            borderColor: theme.border || "#ccc",
          },
        ]}
        placeholder="Enter a word"
        placeholderTextColor={theme.placeholder || "#888"}
        value={word}
        onChangeText={setWord}
      />
      <Button
        title="Search"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: "bold" }}
        onPress={searchWord}
      />

      {error ? (
        <Text style={[styles.error, { color: "red" }]}>{error}</Text>
      ) : null}

      {result && (
        <View style={styles.result}>
          <Text style={[styles.word, { color: theme.text }]}>
            {result.word}
          </Text>
          <AudioPlayer word={result.word} />
          {result.meanings.map((meaning, index) => (
            <View key={index} style={styles.meaning}>
              <Text style={[styles.partOfSpeech, { color: theme.text }]}>
                {meaning.partOfSpeech}
              </Text>
              {meaning.definitions.map((def, i) => (
                <Text
                  key={i}
                  style={[styles.definition, { color: theme.text }]}
                >
                  - {def.definition}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginTop: 10,
  },
  result: {
    marginTop: 20,
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
  },
  partOfSpeech: {
    fontStyle: "italic",
    marginTop: 10,
  },
  definition: {
    marginLeft: 10,
    marginBottom: 5,
  },
  homeImage: {
    width: "100%",
    height: "40%",
    marginBottom: 0,
  },
});
