import { useState } from "react";
import { Alert, Keyboard, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import * as Notifications from 'expo-notifications';


function StartGameScreen({onPickNumber}) {
    const [enteredNumber, setEnteredNumber] = useState('')

    async function scheduleNotif(){
        console.log("Show")
        const hasPushNotificationPermissionGranted = await askPermissionIos();
        if(hasPushNotificationPermissionGranted){
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Coba gaes",
                    body: "Isinya notif",
                    data: {
                        uu: "kosong"
                    }
                },
                trigger: {
                    seconds: 5
                }
            }).catch((e) => {
                console.log(e)
            });
        }
    }

    async function askPermissionIos(){
        const settings = await Notifications.getPermissionsAsync();
        if(!settings.granted){
            Notifications.requestPermissionsAsync()
        }
        console.log(settings)
        return (
            settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
        );
    }

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText)
    }

    function reset(){
        setEnteredNumber('')
    }

    function confirmInputHandler(){
        let chosenNumber = parseInt(enteredNumber)
        Keyboard.dismiss()
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 98){
            Alert.alert('Invalid Number','Number has to be a number between 0-99',[{ text: 'Cancel', style:'cancel',onPress: reset}])
            return
        }
        console.log(chosenNumber)
        onPickNumber(chosenNumber)
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput style={styles.numberInput} maxLength={2} keyboardType="number-pad" keyboardAppearance="default" onChangeText={numberInputHandler} value={enteredNumber}/>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton>Reset</PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={confirmInputHandler} >Confirm</PrimaryButton>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={scheduleNotif}>Send Notif</PrimaryButton>
                </View>
            </View>
        </View>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: '#4e0329',
        borderRadius: 8,
        elevation: 8,
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.55
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: '#ddb52f',
        borderBottomWidth: 2,
        color: '#ddb52f',
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
})