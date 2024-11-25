import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import VolunteerHome from './pages/volunteer/VolunteerHome';
import StudentHome from './pages/student/StudentHome';
import Training from './pages/volunteer/Training';
import Map from './pages/Map';
import Messages from './pages/messages/Messages';
import Conversation from './pages/messages/Conversation';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/ProfileEdit';
import { Calendar, RouteDetails } from './pages/student/AddRoute';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function VolunteerTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={VolunteerHome} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function StudentTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={StudentHome} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Land" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Land" component={Landing} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="VolunteerTabs" component={VolunteerTabs} />
        <Stack.Screen name="StudentTabs" component={StudentTabs} />
        <Stack.Screen name="StudentHome" component={StudentHome} />
        <Stack.Screen name="Training" component={Training} />
        <Stack.Screen name="Conversation" component={Conversation} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="RouteDetails" component={RouteDetails} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}