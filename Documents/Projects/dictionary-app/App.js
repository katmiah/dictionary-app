import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  Image,
} from "react-native";
import axios from "axios";
import ThemeToggle from "./Components/ThemeToggle";
import AudioPlayer from "./Components/Audio.jsx";

export default function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

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
        { backgroundColor: isDarkMode ? "#000" : "#fff" },
      ]}
    >
      <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      <Text style={styles.title}>Welcome to my Dictionary App!</Text>
      <Image
        style={styles.homeImage}
        source={{
          uri: "https://cdn.pixabay.com/photo/2015/05/25/14/53/book-783394_1280.png",
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={word}
        onChangeText={setWord}
      />
      <Button title="Search" onPress={searchWord} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {result && (
        <View style={styles.result}>
          <Text style={styles.word}>{result.word}</Text>
          <AudioPlayer word={result.word} />
          {result.meanings.map((meaning, index) => (
            <View key={index} style={styles.meaning}>
              <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
              {meaning.definitions.map((def, i) => (
                <Text key={i} style={styles.definition}>
                  - {def.definition}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
