// src/components/QuestionCard.js
import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import OptionButton from "./OptionButton";

const QuestionCard = ({
  question,
  options,
  correctAnswer,
  selectedOption,
  onAnswer,
}) => {
  const handleSelectOption = (option) => {
    if (selectedOption === null) {
      onAnswer(option);
    }
  };

  const renderQuestionText = (text) => {
    const parts = text.split("?");
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.question}>{parts[0]}</Text>
        <Image
          source={require("../../assets/images/QuestionMark.png")}
          style={styles.questionMark}
        />
        <Text style={styles.question}>{parts[1]}</Text>
      </View>
    );
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>{renderQuestionText(question)}</View>
      <View style={styles.optionsContainer}>
        {options.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            onPress={() => handleSelectOption(option)}
            isSelected={selectedOption === option}
            isCorrect={selectedOption === option && option === correctAnswer}
            isIncorrect={selectedOption === option && option !== correctAnswer}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginVertical: 5,
    borderColor: "#8D8D8D",
    borderWidth: 1,
    alignItems: "center",
    width: "80%",
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#133362",
  },
  questionMark: {
    width: 35,
    height: 35,
    resizeMode: "contain",
    marginLeft: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "80%",
  },
});

export default QuestionCard;
