import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import CustomButton from "../components/CustomButton";

const { width, height } = Dimensions.get("window");

const ResultScreen = ({ route, navigation }) => {
  const { correct, incorrect } = route.params;
  const totalQuestions = correct + incorrect;
  const coins = correct * 10; // Updated coin calculation to match provided example
  const [animations, setAnimations] = useState([]);

  useEffect(() => {
    startAnimations();
  }, []);

  const startAnimations = () => {
    const newAnimations = [];
    const numberOfCoins = coins / 2; // Number of coins to animate
    for (let i = 0; i < numberOfCoins; i++) {
      const animation = new Animated.Value(0);
      newAnimations.push(animation);
      Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        delay: i * 100, // Stagger the animations
        useNativeDriver: true,
      }).start();
    }
    setAnimations(newAnimations);
  };

  const formatCoins = (coins) => {
    return coins.toString().padStart(5, "0");
  };

  const renderCoinAnimations = () => {
    return animations.map((animation, index) => {
      const coinAnimationStyle = {
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -500],
            }),
          },
          {
            translateX: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          },
        ],
        opacity: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [1, 0.4, 0],
        }),
      };

      return (
        <Animated.Image
          key={index}
          source={require("../../assets/images/moneda.png")}
          style={[styles.coinImage, styles.animatedCoin, coinAnimationStyle]}
        />
      );
    });
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
          <View style={styles.coin_top_container}>
            <Image
              source={require("../../assets/images/moneda.png")}
              style={styles.coin_top}
            />
            <Text style={styles.coin_top_text}>{formatCoins(coins)}</Text>
          </View>
          <TouchableOpacity style={styles.dropdownButton}>
            <Image
              source={require("../../assets/images/Btn_Desplegable.png")}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.results_container}>
          <Text style={styles.title}>¡Buen trabajo!</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statText}>{totalQuestions}</Text>
              <Text style={styles.statLabel}>Preguntas</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statText}>{correct}</Text>
              <Text style={styles.statLabel}>Correctas</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statText}>{incorrect}</Text>
              <Text style={styles.statLabel}>Incorrectas</Text>
            </View>
          </View>
          <View style={styles.coinContainer}>
            <Text style={styles.coinTitle}>Monedas obtenidas</Text>
            <View style={styles.coinContent}>
              <Image
                source={require("../../assets/images/moneda.png")}
                style={styles.coinImage}
              />
              <Text style={styles.coinText}>{coins}</Text>
            </View>
          </View>
          <CustomButton
            title="Volver a Inicio"
            onPress={() =>
              navigation.navigate("Transition", { nextScreen: "Instructions" })
            }
            style={styles.button}
          />
        </View>
        {renderCoinAnimations()}
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
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    width: width * 0.25,
  },
  statText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#204D8D",
  },
  statLabel: {
    fontSize: 16,
    color: "#204D8D",
  },
  coinContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  coinTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  coinContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center content horizontally
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    width: width * 0.5, // Aumentar el ancho del contenedor
  },
  coinImage: {
    width: 60,
    height: 60,
    marginRight: 10,
    resizeMode: "contain", // Asegurarse de que la imagen no esté cortada
  },
  animatedCoin: {
    position: "absolute",
    bottom: height / 2.5, // Adjust starting position
    left: width / 2.5, // Adjust starting position
  },
  coinText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#204D8D",
  },
  button: {
    fontSize: 18,
  },
  planet: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 80,
    height: 80,
  },
  topRightContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  coin_top_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#204D8D",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  coin_top: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  coin_top_text: {
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
  results_container: {
    backgroundColor: "#204D8D",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    margin: 20,
  },
});

export default ResultScreen;
