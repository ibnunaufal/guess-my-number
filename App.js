import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import GameScreen from './screens/GameScreen';
import StartGameScreen from './screens/StartGameScreen';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  },
  handleError: async (err) => {
    console.log("error" + err)
  }
})
export default function App() {

  const [userNumber, setUserNumber] = useState()

  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber)
  }

  function resetPickedNumber(){
    console.log("pressed")
    setUserNumber("")
  }

  let screens = <StartGameScreen onPickNumber={pickedNumberHandler} />

  if(userNumber){
    screens = <GameScreen onReset={resetPickedNumber} userNumber={userNumber} />
  }

  return (
    <View style={styles.rootScreen}>
      <ImageBackground source={require('./assets/images/background.png')} resizeMode="cover" style={styles.rootScreen} >
        <StatusBar style='dark' />
        <SafeAreaView style={styles.rootScreen}>
          {screens}
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootScreen: {
    flex: 1,
  }
});
