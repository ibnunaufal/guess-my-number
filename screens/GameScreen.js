import { useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";

function GameScreen({ userNumber, onReset }) {
  var minBoundary = 1;
  var maxBoundary = 100;
  function generateRandomBetween(min, max, exclude) {
    const rndNumb = Math.floor(Math.random() * (max - min) + min);

    if (rndNumb === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNumb;
    }
  }
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber
  );

  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  function nextGuessHandler(direction) {
    if (direction === "lower" && currentGuess < userNumber || direction === "higher" && currentGuess > userNumber){
        Alert.alert("Don't Lie!","You know it is wrong...",[{text: 'Sorry',style:'cancel'}])
        return 
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNmb = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    console.log(minBoundary, maxBoundary, userNumber);
    setCurrentGuess(newRndNmb);
  }

  function reset() {
    console.log("press");
    onReset();
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>Higher or lower?</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "higher")}>
            +
          </PrimaryButton>
        </View>
      </View>
      <View>
        <Button title="Back" onPress={reset} />
      </View>
    </View>
  );
}
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "yellow",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#ffff00",
    padding: 12,
  },
});
