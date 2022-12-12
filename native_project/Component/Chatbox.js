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
            <View style={styles.messagesContainer}>
                {messages.map((message) => (
                    (message.userid !== currentUserId) ?
                        <View style={messageStyle.hisMessageContainer}>
                            <View key={message.id} style={messageStyle.hisMessages}>
                                <View style={messageStyle.sendBy}>
                                    <Text style={messageStyle.hisMessagesColor}>{message.username}</Text>
                                    <Text style={messageStyle.hisMessagesColor}>{message.date.date}</Text>
                                </View>
                                <Text style={messageStyle.hisMessagesColor}>{message.content}</Text>
                            </View>
                        </View>
                        :
                        <View style={messageStyle.myMessageContainer}>
                            <View key={message.id} style={messageStyle.myMessages}>
                                <View style={messageStyle.sendBy}>
                                    <Text style={messageStyle.myMessagesColor}>{message.username}</Text>
                                    <Text style={messageStyle.myMessagesColor}>{message.date.date}</Text>
                                </View>
                                <Text style={messageStyle.myMessagesColor}>{message.content}</Text>
                            </View>
                        </View>
                ))}
            </View>
            <View style={messageStyle.inputMessage}>
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
    },
    messagesContainer: {
        width: '100%',
    }
});
const messageStyle = StyleSheet.create({
    hisMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'right',
        marginRight: '20px',
    },
    myMessageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'left',
        marginLeft: '20px',
    },
    hisMessages: {
        backgroundColor: '#F8F9FA',
        maxWidth: '80%',
        padding: '20px',
        marginTop: '5px',
        marginBottom: '5px',
    },
    myMessages: {
        backgroundColor: '#0000FF',
        maxWidth: '80%',
        padding: '20px',
        marginTop: '5px',
        marginBottom: '5px',
    },
    myMessagesColor: {
        color: '#FFFFFF',
    },
    hisMessagesColor: {
        color: '#000000',
    },
    sendBy: {
        flex: 1,
        flexDirection: 'row',
    },
    inputMessage: {
        position: 'fixed',
        bottom: '0',
        width: '100%',
        padding: '10px',
        backgroundColor: '#ffffff',
    }
});