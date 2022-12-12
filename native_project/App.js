import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./Auth/Login";
import Chatbox from "./Component/Chatbox";
import AfterLogScreen from "./Component/AfterLogScreen";
import UserProvider from "./Context/UserContext";

import 'react-native-gesture-handler';
import * as React from 'react';
import CustomSidebarMenu from "./CustomSidebarMenu";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <UserProvider>
            <NavigationContainer  drawerContent={(props) => <CustomSidebarMenu {...props} />} >
                <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Login" component={Login} options={{title: 'Log In'}}/>
                    <Stack.Screen name="AfterLogScreen" component={AfterLogScreen}/>
                    <Stack.Screen name="Chatbox" component={Chatbox}/>
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}