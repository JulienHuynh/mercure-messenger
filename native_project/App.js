import 'react-native-gesture-handler';

import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';
import ProfileScreen from "./Component/Profile";
import UserList from "./Component/UserList";

const Drawer = createDrawerNavigator();

function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => <CustomSidebarMenu {...props} />}>
                <Drawer.Screen
                    name="UserList"
                    options={{drawerLabel: 'Liste des utilisateurs', title: 'Liste des utilisateurs'}}
                    component={UserList}
                />
                <Drawer.Screen
                    name="ProfileScreen"
                    options={{drawerLabel: 'Mon Profil', title: 'Mon Profil'}}
                    component={ProfileScreen}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;