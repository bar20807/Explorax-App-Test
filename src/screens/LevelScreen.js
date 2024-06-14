import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import QuestionCard from "../components/QuestionCard";

const { width, height } = Dimensions.get("window");

const questions = [
  {
    question: "2 + 5 x 3 = ?",
    options: ["21", "10", "17", "13"],
    correctAnswer: "17",
  },
  {
    question: "4 x 5 - 2 = ?",
    options: ["18", "20", "15", "10"],
    correctAnswer: "18",
  },
  {
    question: "3 x 3 + 6 = ?",
    options: ["15", "12", "9", "18"],
    correctAnswer: "15",
  },
  {
    question: "4 x 4 + 2 = ?",
    options: ["18", "25", "32", "19"],
    correctAnswer: "18",
  },
];

const LevelScreen = ({ navigation }) => {
  const [level, setLevel] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [coins, setCoins] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false); // Nuevo estado
  const [correctSound, setCorrectSound] = useState();
  const [incorrectSound, setIncorrectSound] = useState();
  const [progressSound, setProgressSound] = useState();

  const coinShake = useSharedValue(0);

  useEffect(() => {
    loadSounds();
    return () => unloadSounds();
  }, []);

  useEffect(() => {
    if (selectedOption !== null) {
      const timer = setTimeout(() => {
        handleNextLevel();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedOption]);

  const loadSounds = async () => {
    const correctSoundObject = new Audio.Sound();
    const incorrectSoundObject = new Audio.Sound();
    const progressSoundObject = new Audio.Sound();
    try {
      await correctSoundObject.loadAsync(
        require("../../assets/sounds/RespuestaCorrecta.mp3")
      );
      await incorrectSoundObject.loadAsync(
        require("../../assets/sounds/RespuestaIncorrecta.mp3")
      );
      await progressSoundObject.loadAsync(
        require("../../assets/sounds/BarraProgreso.mp3")
      ); // Asegúrate de tener este archivo
      setCorrectSound(correctSoundObject);
      setIncorrectSound(incorrectSoundObject);
      setProgressSound(progressSoundObject);
    } catch (error) {
      console.error("Error loading sounds: ", error);
    }
  };

  const unloadSounds = async () => {
    await correctSound?.unloadAsync();
    await incorrectSound?.unloadAsync();
    await progressSound?.unloadAsync();
  };

  const handleNextLevel = () => {
    setSelectedOption(null);
    if (level < questions.length - 1) {
      setLevel(level + 1);
      setCurrentQuestion(questions[level + 1]);
      progressSound?.replayAsync();
    } else {
      navigation.navigate("Transition", {
        nextScreen: "Result",
        correct: correct,
        incorrect: incorrect,
      });
    }
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setHasAnswered(true); // Marcar que ha respondido al menos una pregunta
    if (option === currentQuestion.correctAnswer) {
      setCorrect(correct + 1);
      setCoins(coins + 10); // Incrementar monedas por respuesta correcta
      correctSound?.replayAsync();
      // Animación de vibración de la moneda
      coinShake.value = withSequence(
        withTiming(10, { duration: 50, easing: Easing.linear }),
        withTiming(-10, { duration: 50, easing: Easing.linear }),
        withTiming(10, { duration: 50, easing: Easing.linear }),
        withTiming(0, { duration: 50, easing: Easing.linear })
      );
    } else {
      setIncorrect(incorrect + 1);
      incorrectSound?.replayAsync();
    }
  };

  const formatCoins = (coins) => {
    return coins.toString().padStart(5, "0");
  };

  const animatedCoinStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: coinShake.value }],
    };
  });

  return (
    <ImageBackground
      source={require("../../assets/images/background.png")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <Image
        source={require("../../assets/images/PlanetaAritmética.png")}
        style={styles.planet}
      />
      <View style={styles.container}>
        <View style={styles.topRightContainer}>
          <View style={styles.coinContainer}>
            <Animated.Image
              source={require("../../assets/images/moneda.png")}
              style={[styles.coin, animatedCoinStyle]}
            />
            <Text style={styles.coinText}>{formatCoins(coins)}</Text>
          </View>
          <TouchableOpacity style={styles.dropdownButton}>
            <Image
              source={require("../../assets/images/Btn_Desplegable.png")}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.title_container}>
          <Text style={styles.title}>Desafíate</Text>
          <Image
            source={require("../../assets/images/line.png")}
            style={styles.line}
          />
        </View>
        <Text style={styles.levelText}>
          Nivel {level + 1}/{questions.length}
        </Text>
        <View style={styles.progressBarContainer}>
          {hasAnswered ? (
            <ImageBackground
              source={require("../../assets/images/BarraProgresoNaranja.png")}
              style={[
                styles.progressBarFill,
                { width: `${((level + 1) / questions.length) * 100}%` },
              ]}
              imageStyle={{ resizeMode: "cover" }}
            />
          ) : (
            <View
              style={[
                styles.progressBarFill,
                { width: "100%", backgroundColor: "#FFF" },
              ]}
            />
          )}
        </View>
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          selectedOption={selectedOption}
          onAnswer={handleAnswer}
          handleNextLevel={handleNextLevel}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  topRightContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  coinContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#204D8D",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  coin: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  coinText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdownButton: {
    marginLeft: 10,
    marginTop: 10,
  },
  dropdownIcon: {
    width: 30,
    height: 30,
    transform: [{ rotate: "180deg" }],
  },
  planet: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 80,
    height: 80,
  },
  levelText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 5,
    alignSelf: "flex-start",
    marginLeft: "12%",
  },
  progressBarContainer: {
    width: "75%",
    height: 30,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "#DDD", // Fondo blanco
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "transparent", // Fondo transparente para superposición de imagen
  },
  title_container: {
    padding: 20,
    alignItems: "center",
    margin: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  line: {
    width: 250,
    height: 30,
    resizeMode: "contain",
  },
});

export default LevelScreen;
