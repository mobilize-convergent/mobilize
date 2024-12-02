import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Dropdown from '../components/Dropdown';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const validateInputs = () => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address");
            return false;
        }

        // Password validation
        if (password.length < 6) {
            Alert.alert("Invalid Password", "Password must be at least 6 characters long");
            return false;
        }

        // Role validation
        if (!role) {
            Alert.alert("Role Required", "Please select a role");
            return false;
        }

        return true;
    };

    const handleSignUp = async () => {
        // Validate inputs first
        if (!validateInputs()) {
            return;
        }


        const usersFileUri = `${FileSystem.documentDirectory}users.json`;
        let users = [];
    
        try {
            // Check if the file exists
            const fileInfo = await FileSystem.getInfoAsync(usersFileUri);
            if (fileInfo.exists) {
                // Read the file if it exists
                const usersFile = await FileSystem.readAsStringAsync(usersFileUri);
                users = JSON.parse(usersFile);
                
                // Check for existing email
                if (users.some(user => user.email === email)) {
                    Alert.alert("Email Exists", "This email is already registered");
                    return;
                }
            } else {
                // Create the file with an empty array if it doesn't exist
                await FileSystem.writeAsStringAsync(usersFileUri, JSON.stringify([]));
            }
        } catch (error) {
            console.log('Error reading users file:', error);
            Alert.alert("Error", "Unable to access users file.");
            return;
        }

        if (role === 'disabled') {
            users.push({ email, password, role });
            try {
                await FileSystem.writeAsStringAsync(usersFileUri, JSON.stringify(users));
                navigation.reset({
                    index: 1,
                    routes: [
                        { name: 'Land' },
                        { name: 'Login' }
                    ],
                })
            } catch (error) {
                console.log('Error writing users file:', error);
                Alert.alert("Sign Up Failed", "An error occurred. Please try again.");
            }
        } else if (role === 'volunteer') {
            navigation.navigate('Training', {
                users,
                usersFileUri,
                email,
                password,
                role,
            });
        }
    };
    
    const roleOptions = [
        { label: 'Disabled Student', value: 'disabled' },
        { label: 'Volunteer', value: 'volunteer' }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>

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

            <Dropdown
                label="Select Role"
                data={roleOptions}
                onSelect={(value) => setRole(value)}
                selectedValue={role}
                placeholder="Select your role"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
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

export default SignUp;