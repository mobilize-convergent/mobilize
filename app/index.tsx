import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './pages/Landing';
import Login from './pages/Login';

import SignUp from './pages/SignUp';
import Training from './pages/volunteer/Training';

import VolunteerHome from './pages/volunteer/VolunteerHome';
import Map from './pages/Map';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer  independent={true}>
      <Stack.Navigator initialRouteName="Land">
        <Stack.Screen name="Land" component={Landing}/>
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="VolunteerHome" component={VolunteerHome} />
        <Stack.Screen name="Training" component={Training} />

        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}