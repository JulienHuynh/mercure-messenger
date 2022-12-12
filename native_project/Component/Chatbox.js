import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function Chatbox({navigation, route}) {
    const topic = route.params?.topic;

    return (
        <View style={styles.container}>
            <Text>Chatbox</Text>
            <Text>{topic}</Text>
            <StatusBar style="auto" />
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
});
