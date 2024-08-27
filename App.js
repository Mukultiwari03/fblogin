import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './pages/LoginScreen';
import Home from './pages/Home';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

export default App