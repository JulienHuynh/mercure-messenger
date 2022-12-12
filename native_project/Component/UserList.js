import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import {useEffect, useState} from "react";
import useGetUserList from "../Hook/useGetUserList";
import useBuildTopicId from "../Hook/useBuildTopicId";

export default function UserList(props) {
    const [userList, setUserList] = useState([]);
    const getUserList = useGetUserList();
    const buildTopicId = useBuildTopicId();

    useEffect(() => {
        getUserList().then(data => setUserList(data.users));
    }, [])

    return (
        <View style={styles.container}>
            <Text>Utilisateurs</Text>
            {userList.map((user) => (
                <Button key={user.id} onPress={() => props.navigation.navigate('Chatbox', {topic: buildTopicId(user.id)})}
                title={user.username}/>
            ))}
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
