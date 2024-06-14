// src/screens/TransitionScreen.js
import React, { useEffect } from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const TransitionScreen = ({ navigation, route }) => {
  const { nextScreen, ...params } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(nextScreen, params);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation, nextScreen, params]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo_blanco_transicion.png")}
        style={styles.logo}
      />
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
  logo: {
    width: width * 0.5,
    height: height * 0.5,
    resizeMode: "contain",
  },
});

export default TransitionScreen;
