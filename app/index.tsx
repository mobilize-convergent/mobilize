import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './pages/Landing';
import Login from './pages/Login';

import SignUp from './pages/SignUp';

import Training from './pages/volunteer/Training';
import VolunteerHome from './pages/volunteer/VolunteerHome';

import StudentHome from './pages/student/StudentHome';

import Map from './pages/Map';

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer  independent={true}>
      <Stack.Navigator initialRouteName="Land">
        <Stack.Screen name="Land" component={Landing} options={({headerShown: false})}/>
        <Stack.Screen name="Login" component={Login} options={({headerShown: false})}/>

        <Stack.Screen name="SignUp" component={SignUp} options={{headerShown:false}}/>

        <Stack.Screen name="VolunteerHome" component={VolunteerHome} options={{headerShown:false}}/>
        <Stack.Screen name="Training" component={Training} options={{headerShown:false}}/>

        <Stack.Screen name="StudentHome" component={StudentHome} options={{headerShown:false}}/>

        <Stack.Screen name="Map" component={Map} options={({headerShown: false})}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}