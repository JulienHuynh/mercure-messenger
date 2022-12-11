import UserList from "./Component/UserList";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Liste des utilisateurs" component={UserList} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}