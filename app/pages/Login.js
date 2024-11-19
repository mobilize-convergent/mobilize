import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const usersFileUri = `${FileSystem.documentDirectory}users.json`;
        
        try {
            // Check if the file exists
            const fileInfo = await FileSystem.getInfoAsync(usersFileUri);
            if (!fileInfo.exists) {
                Alert.alert("Error", "No users found. Please sign up first.");
                return;
            }

            // Read and parse the users file
            const usersFile = await FileSystem.readAsStringAsync(usersFileUri);
            const users = JSON.parse(usersFile);

            // Find user with matching credentials
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Navigate based on user role
                if (user.role === 'disabled') {
                    navigation.reset({
                        index: 0,
                        routes: [
                            { name: 'StudentHome' }
                        ],
                    });
                } else if (user.role === 'volunteer') {
                    navigation.reset({
                        index: 0,
                        routes: [
                            { name: 'VolunteerTabs' }
                        ],
                    });
                }
            } else {
                Alert.alert(
                    "Login Failed",
                    "Invalid email or password. Please try again.",
                    [{ text: "OK" }]
                );
            }
        } catch (error) {
            console.error('Error reading users file:', error);
            Alert.alert(
                "Error",
                "An error occurred while trying to log in. Please try again.",
                [{ text: "OK" }]
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
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
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 16,
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

export default Login;