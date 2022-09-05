import { StyleSheet, Text, View } from "react-native";

function NumberContainer(props){
    return (
        <View style={styles.container}>
            <Text style={styles.numberText}> { props.children } </Text>
        </View>
    )
}

export default NumberContainer;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: 'purple',
        padding: 24,
        margin: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    numberText: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'yellow'
    }
})