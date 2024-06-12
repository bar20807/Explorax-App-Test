// src/components/OptionButton.js
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const OptionButton = ({ option, onPress, isSelected, isCorrect }) => {
  const backgroundColor = isSelected
    ? isCorrect
      ? "#6FBA3B"
      : "#E6333C"
    : "#6AB1B5";
  const borderColor = isSelected
    ? isCorrect
      ? "#4F9C2F"
      : "#B52C41"
    : "#448B8C";

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor, borderColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{option}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 2,
    width: "45%",
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 30,
    textAlign: "center",
  },
});

export default OptionButton;
