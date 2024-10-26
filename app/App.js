import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import MapScreen from './pages/MapScreen'; // Make sure this exists

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import LandingScreen from './pages/LandingScreen';
// import LoginScreen from './pages/LoginScreen';
// import SignScreen from './pages/SignScreen';
// import HomeScreen from './pages/HomeScreen';
// import MapScreen from './pages/MapScreen';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Land">
//         <Stack.Screen name="Land" component={LandingScreen} />
//         {/*<Stack.Screen name="Login" component={LoginScreen} />*/}
//         {/*<Stack.Screen name="Sign" component={SignScreen} />*/}

//         {/*<Stack.Screen name="Home" component={HomeScreen} />*/}
//         <Stack.Screen name="Map" component={MapScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }