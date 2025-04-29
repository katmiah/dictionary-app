import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import axios from "axios";

interface Meaning {
  partOfSpeech: string;
  definitions: {
    definition: string;
    example?: string;
  }[];
}

interface DictionaryResponse {
  word: string;
  meanings: Meaning[];
}

export default function App() {
  const [word, setWord] = useState("");
  const [result, setResult] = useState<DictionaryResponse | null>(null);
  const [error, setError] = useState("");

  const searchWord = async () => {
    setError("");
    setResult(null);
    try {
      const response = await axios.get<DictionaryResponse[]>(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      setResult(response.data[0]);
    } catch (error) {
      setError("Word not found. Try another.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dictionary App</Text>
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
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  result: {
    marginTop: 20,
  },
  word: {
    fontSize: 20,
    fontWeight: "bold",
  },
  partOfSpeech: {
    fontStyle: "italic",
    marginTop: 10,
  },
  definition: {
    marginLeft: 10,
  },
  meaning: {
    marginTop: 10,
  },
});
