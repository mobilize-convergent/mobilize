import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Training = ({ route, navigation }) => {
    const { users, usersFileUri, email, password, role } = route.params;

    const handleDoneTraining = async () => {
        users.push({ email, password, role });
        try {
            await FileSystem.writeAsStringAsync(usersFileUri, JSON.stringify(users));
            navigation.reset({
                index: 1,
                routes: [
                    { name: 'Land' },
                    // { name: 'Login' }
                ],
            })
        } catch (error) {
            console.log('Error writing users file:', error);
            Alert.alert("Sign Up Failed", "An error occurred. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Start your Training!</Text>

            <Text>In order to join user base , please start your training etc. </Text>
    

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.buttonText}>Begin</Text>
            </TouchableOpacity>

            <Text>Side Note for dev: will need placeholder for this screen and talk to design on what it should look like</Text>

            <Button
                title="Done Training"
                onPress={handleDoneTraining}
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
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '100%',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Training;