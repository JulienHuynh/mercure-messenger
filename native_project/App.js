import UserList from "./Component/UserList";
import Chatbox from "./Component/Chatbox";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName="UserList">
            <Stack.Screen name="UserList" component={UserList} options={{title: 'Liste des utilisateurs'}}/>
            <Stack.Screen name="Chatbox" component={Chatbox} options={{title: 'Chatbox'}}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}