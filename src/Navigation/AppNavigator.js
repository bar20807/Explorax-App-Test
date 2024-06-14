// src/navigation/AppNavigator.js
import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Audio } from "expo-av";

import InstructionScreen from "../screens/InstructionScreen";
import LevelScreen from "../screens/LevelScreen";
import ResultScreen from "../screens/ResultScreen";
import TransitionScreen from "../screens/TransitionScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const soundRef = useRef(new Audio.Sound());

  useEffect(() => {
    const loadSound = async () => {
      try {
        await soundRef.current.loadAsync(
          require("../../assets/sounds/Swoosh Transition 03.mp3")
        );
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    };

    loadSound();

    return () => {
      soundRef.current.unloadAsync();
    };
  }, []);

  const playSound = async () => {
    try {
      await soundRef.current.replayAsync();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  return (
    <NavigationContainer
      onStateChange={() => {
        playSound();
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Instructions" component={InstructionScreen} />
        <Stack.Screen name="Level" component={LevelScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Transition" component={TransitionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
