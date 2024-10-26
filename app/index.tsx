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

// import { AppRegistry } from 'react-native';
// import App from './App';
// import appConfig from '../app.json'; // Default import for app.json

// // Use appConfig.expo.name to access the name
// AppRegistry.registerComponent(appConfig.expo.name, () => App);

// import { AppRegistry } from 'react-native';
// import App from './App';
// import appConfig from '../app.json'; // Default import for app.json
// import { Unmatched } from 'expo-router';
// export default Unmatched;

// console.log("inside index.tsx");
// // Use appConfig.expo.name to access the name
// AppRegistry.registerComponent(appConfig.expo.name, () => App);
// import React from "react";
// import { Text, View } from "react-native";

// export default function Index() {
//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Edit app/index.tsx to edit this screen. This should be edited</Text>
//     </View>
//   );
// }