import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import VolunteerHome from './pages/volunteer/VolunteerHome';
import StudentHome from './pages/student/StudentHome';
import Training from './pages/volunteer/Training';
import Map from './pages/Map';
import Messages from './pages/messages/Messages';
import Conversation from './pages/messages/Conversation';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/ProfileEdit';
import AddRoute from './pages/student/AddRoute';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function VolunteerTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',  // Dark background for tab bar
          borderTopWidth: 0,  // Remove border at the top of the tab bar
        },
        tabBarActiveTintColor: '#174864',  // Blue color for active tab
        tabBarInactiveTintColor: '#888',  // Inactive tab icon color
        tabBarShowLabel: false,  // Hide tab labels
        tabBarLabelStyle: {
          display: 'none',  // Ensure labels are completely hidden
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={VolunteerHome}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function StudentTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',  // Dark background for tab bar
          borderTopWidth: 0,  // Remove border at the top of the tab bar
        },
        tabBarActiveTintColor: '#174864',  // Blue color for active tab
        tabBarInactiveTintColor: '#888',  // Inactive tab icon color
        tabBarShowLabel: false,  // Hide tab labels
        tabBarLabelStyle: {
          display: 'none',  // Ensure labels are completely hidden
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={StudentHome}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Land" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Land" component={Landing} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="VolunteerTabs" component={VolunteerTabs} />
        <Stack.Screen name="StudentTabs" component={StudentTabs} />
        <Stack.Screen name="StudentHome" component={StudentHome} />
        <Stack.Screen name="Training" component={Training} />
        <Stack.Screen name="Conversation" component={Conversation} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="AddRoute" component={AddRoute} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}