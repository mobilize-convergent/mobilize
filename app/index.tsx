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

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import MapScreen from './pages/MapScreen'; // Make sure this exists

const Stack = createStackNavigator();

export default function Index() {
    return (
        <NavigationContainer  independent={true}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}