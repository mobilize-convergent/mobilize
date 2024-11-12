import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const initialRegion = {
    latitude: 30.2849,
    longitude: -97.7341,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: 30.2849, longitude: -97.7341 }}
          title={"University of Texas at Austin"}
          description={"A great place to study!"}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;