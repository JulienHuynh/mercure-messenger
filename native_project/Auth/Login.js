import {useContext, useState} from "react";
import {userContext} from "../Context/UserContext";
import { StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import useGetJWT from "../Hook/useGetJWT";
import InputCustom from "../Component/Input";
import Logo from "../assets/images/login.png";
import ButtonCustom from "../Component/Button";

export default function Login(props) {
    const { height } = useWindowDimensions();
    const getJWT = useGetJWT();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggedUser, setLoggedUser] = useContext(userContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        getJWT(username, password).then(data => {
            if (data.JWT) {
                setLoggedUser(data.JWT);
                console.log(loggedUser);
                props.navigation.navigate('AfterLogScreen');
            } else {
                console.log(data)
            }
        })
    }

    return (
        <View style={styles.root}>
            <Image
                source={Logo}
                style={[styles.title, { height: height * 0.3 }]}
                resizeMode="contain"
            />

            <InputCustom
                placeholder="Username"
                value={username}
                setValue={setUsername}
            />
            <InputCustom
                placeholder="Password"
                value={password}
                setValue={setPassword}
                secureTextEntry={true}
            />

            <ButtonCustom onPress={handleSubmit} text="Log In" />
        </View>

    )
}

const styles = StyleSheet.create({
    root: {
        aligns: "center",
        padding: 50,
    },
    title: {
        maxWidth: 300,
        maxHeight: 150,
    },
    container: {
        justifyContent: "center",
        backgroundColor: "white",
        width: 250,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#e8e8e8",
    },
});