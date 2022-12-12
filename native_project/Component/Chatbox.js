import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect, useState} from "react";
import useGetConversation from "../Hook/useGetConversation"
import useGetCurrentUser from "../Hook/useGetCurrentUser";
import usePersistMessage from "../Hook/usePersistMessage";
import InputCustom from "./Input";

export default function Chatbox({navigation, route}) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const topic = route.params?.topic;
    const getConversation = useGetConversation();
    const currentUser = useGetCurrentUser();
    const persistMessage = usePersistMessage();
    const currentUserId = currentUser.userid;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(topic, newMessage, currentUserId);
        persistMessage(topic, newMessage, currentUserId);
        setNewMessage("");
    }

    const handleMessage = (e) => {
        const chatData  = JSON.parse(e.data);
        let newChat = [];
        Object.values(chatData.chat).forEach(x => newChat.push(x));
        console.log(newChat);
        setMessages(newChat);
    }

    useEffect(() => {
        getConversation(topic);

        const url = new URL('http://localhost:9090/.well-known/mercure');
        url.searchParams.append('topic', `https://example.com/chat/{topic}`);

        const eventSource = new EventSource(url, {withCredentials: true});
        eventSource.onmessage = handleMessage;

        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <View style={styles.container}>
            <Text>Chatbox</Text>
            <View>
                {messages.map((message) => (
                    (message.userid !== currentUserId) ?
                        <View key={message.id}>
                            <Text>{message.username}</Text>
                            <Text>{message.date.date}</Text>
                            <Text>{message.content}</Text>
                        </View>
                        :
                        <View key={message.id}>
                            <Text>(Moi) {message.username}</Text>
                            <Text>{message.date.date}</Text>
                            <Text>{message.content}</Text>
                        </View>
                ))}
            </View>
            <View>
                <InputCustom
                    placeholder="Votre message..."
                    value={newMessage}
                    setValue={setNewMessage}
                />
                <Button title="Envoyer le message" onPress={handleSubmit}></Button>
            </View>
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
