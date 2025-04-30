import { Audio } from "expo-av";
import React from "react";
import { Button, Text, View } from "react-native";
import { useState } from "react";

const AudioPlayer = ({ word }) => {
  const [audioError, setAudioError] = useState("");

  const playAudio = async () => {
    setAudioError("");
    const audioUrl = `https://api.dictionaryapi.dev/media/pronunciations/en/${word}-uk.mp3`;

    try {
      const response = await fetch(audioUrl);
      if (!response.ok) {
        setAudioError("Pronunciation not avialable for this word.");
        return;
      }

      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
    } catch (error) {
      setAudioError("An error occurred while playing the audio.");
    }
  };

  return (
    <View>
      <Button title="Play Pronunciation" onPress={playAudio} />
      {audioError ? <Text style={{ color: "red" }}>{audioError}</Text> : null}
    </View>
  );
};

export default AudioPlayer;
