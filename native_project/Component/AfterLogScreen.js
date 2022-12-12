import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UserList from "./UserList";
import Chatbox from "./Chatbox";
import Login from "../Auth/Login"

import 'react-native-gesture-handler';
import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

export default function AfterLogScreen() {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator initialRouteName="UserList">
            <Drawer.Screen name="UserList" component={UserList} options={{title: 'Liste des utilisateurs'}}/>
            <Drawer.Screen name="Chatbox" component={Chatbox} options={{title: 'Dernière conversation'}}/>
            <Drawer.Screen name="Login" component={Login} options={{title: 'Se Déconnecter'}}/>
        </Drawer.Navigator>
    );
}