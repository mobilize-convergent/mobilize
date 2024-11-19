import React from 'react';
import { View, Text, Button, StyleSheet, BottomNavigation } from 'react-native';

const VolunteerHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Accessibility App!</Text>
      <Text style={styles.description}>
        This app helps UT Austin disabled students navigate the campus.
      </Text>
      <Button
        title="Go to Map"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default VolunteerHome;