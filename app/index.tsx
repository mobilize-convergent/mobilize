import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './pages/LandingScreen';
import LoginScreen from './pages/LoginScreen';

import SignScreen from './pages/SignScreen';
import StudentSignScreen from './pages/StudentSignScreen';
import VolunteerSignScreen from './pages/volunteer/VolunteerSignScreen';
import TrainingScreen from './pages/volunteer/TrainingScreen';

import HomeScreen from './pages/HomeScreen';
import MapScreen from './pages/MapScreen';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer  independent={true}>
      <Stack.Navigator initialRouteName="Land">
        <Stack.Screen name="Land" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen name="Sign" component={SignScreen} />
        <Stack.Screen name="Student" component={StudentSignScreen} />
        <Stack.Screen name="Volunteer" component={VolunteerSignScreen} />
        <Stack.Screen name="Training" component={TrainingScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}