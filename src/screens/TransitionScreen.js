// src/screens/TransitionScreen.js
import React, { useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const TransitionScreen = ({ navigation, route }) => {
  const { nextScreen, ...params } = route.params;
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    });

    const timer = setTimeout(() => {
      navigation.navigate(nextScreen, params);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, nextScreen, params]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, animatedStyles]}>
        <Image
          source={require("../../assets/images/logo_blanco_transicion.png")}
          style={styles.logo}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87CEEB", // Sky blue color
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: width * 0.5,
    height: height * 0.5,
    resizeMode: "contain",
  },
});

export default TransitionScreen;
