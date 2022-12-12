import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Auth/Login";
import UserList from "./Component/UserList";
import Chatbox from "./Component/Chatbox";
import UserProvider from "./Context/UserContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <UserProvider>
          <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                  <Stack.Screen name="Login" component={Login} options={{title: 'Log In'}}/>
                  <Stack.Screen name="UserList" component={UserList} options={{title: 'Liste des utilisateurs'}}/>
                  <Stack.Screen name="Chatbox" component={Chatbox} options={{title: 'Chatbox'}}/>
              </Stack.Navigator>
          </NavigationContainer>
      </UserProvider>
  );
}