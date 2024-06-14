// src/navigation/AppNavigator.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LevelScreen from "../screens/LevelScreen";
import ResultScreen from "../screens/ResultScreen";
import InstructionsScreen from "../screens/InstructionScreen";
import TransitionScreen from "../screens/TransitionScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Instructions"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Instructions" component={InstructionsScreen} />
        <Stack.Screen name="Level" component={LevelScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Transition" component={TransitionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
