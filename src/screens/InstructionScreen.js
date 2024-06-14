import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const InstructionScreen = ({ navigation }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    animationRef.current?.play();
    animationRef.current?.play(30, 120);
  }, []);

  const navigateToLevel = () => {
    navigation.navigate("Transition", { nextScreen: "Level" });
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
            <Text style={styles.coinText}>00000</Text>
          </View>
          <TouchableOpacity style={styles.dropdownButton}>
            <Image
              source={require("../../assets/images/Btn_Desplegable.png")}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.instructionContainer}>
          <Text style={styles.title}>¡Desafíate!</Text>
          <Image
            source={require("../../assets/images/line.png")}
            style={styles.line}
          />
          <Text style={styles.description}>
            Supera estos desafíos y empieza a completar la misión de:
          </Text>
          <Text style={styles.mission}>Jerarquía de operaciones</Text>
          <TouchableOpacity style={styles.button} onPress={navigateToLevel}>
            <Text style={styles.buttonText}>¡ACEPTO EL RETO!</Text>
          </TouchableOpacity>
        </View>
        <Image
          source={require("../../assets/images/Chanín.png")}
          style={styles.character}
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
  instructionContainer: {
    backgroundColor: "#204D8D",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    margin: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  line: {
    width: 250,
    height: 30,
    resizeMode: "contain",
  },
  description: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
  },
  mission: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#204D8D",
    fontSize: 18,
    fontWeight: "bold",
  },
  animation: {
    width: 150,
    height: 150,
    marginTop: 20,
  },
  character: {
    position: "absolute",
    bottom: height * 0.05,
    left: width * 0.02,
    width: width * 0.2,
    height: height * 0.5,
    resizeMode: "contain",
  },
});

export default InstructionScreen;
