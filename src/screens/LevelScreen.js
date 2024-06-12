// src/screens/LevelScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import QuestionCard from "../components/QuestionCard";
import CustomButton from "../components/CustomButton";

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
];

const LevelScreen = ({ navigation }) => {
  const [level, setLevel] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (selectedOption !== null) {
      const timer = setTimeout(() => {
        handleNextLevel();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedOption]);

  const handleNextLevel = () => {
    setSelectedOption(null);
    if (level < questions.length - 1) {
      setLevel(level + 1);
      setCurrentQuestion(questions[level + 1]);
    } else {
      navigation.navigate("Result", { correct, incorrect });
    }
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    if (option === currentQuestion.correctAnswer) {
      setCorrect(correct + 1);
      setCoins(coins + 10); // Incrementar monedas por respuesta correcta
    } else {
      setIncorrect(incorrect + 1);
    }
  };

  const formatCoins = (coins) => {
    return coins.toString().padStart(5, "0");
  };

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
            <Image
              source={require("../../assets/images/moneda.png")}
              style={styles.coin}
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
          <View
            style={[
              styles.progressBar,
              { width: `${((level + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
        <QuestionCard
          question={currentQuestion.question}
          options={currentQuestion.options}
          correctAnswer={currentQuestion.correctAnswer}
          selectedOption={selectedOption}
          onAnswer={handleAnswer}
        />
        <CustomButton title="Siguiente" onPress={handleNextLevel} />
        <Text style={styles.reportQuestion}>Reportar pregunta</Text>
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
    backgroundColor: "#DDD",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    alignSelf: "center",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFA500",
  },
  title_container: {
    padding: 20,
    alignItems: "center",
    margin: 20,
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
  reportQuestion: {
    marginTop: 10,
    color: "#FFFFFF",
    textDecorationLine: "underline",
  },
});

export default LevelScreen;
