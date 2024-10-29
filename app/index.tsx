import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import MapScreen from './pages/MapScreen'; // Make sure this exists
import LandingScreen from './pages/LandingScreen';
import LoginScreen from './pages/LoginScreen';
// import SignScreen from './pages/SignScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer  independent={true}>
      <Stack.Navigator initialRouteName="Land">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Land" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        {/*<Stack.Screen name="Sign" component={SignScreen} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}