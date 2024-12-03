import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';  // Import AsyncStorage
import Dropdown from '../components/Dropdown';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');

    const validateInputs = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address");
            return false;
        }

        if (password.length < 6) {
            Alert.alert("Invalid Password", "Password must be at least 6 characters long");
            return false;
        }

        if (!role) {
            Alert.alert("Role Required", "Please select a role");
            return false;
        }

        if (!firstName || !lastName || !phone) {
            Alert.alert("Required Fields", "Please fill in all fields");
            return false;
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            Alert.alert("Invalid Phone", "Please enter a valid 10-digit phone number");
            return false;
        }

        if (bio.length > 500) {
            Alert.alert("Biography too long", "Please keep your biography under 500 characters.");
            return false;
        }

        return true;
    };

    const handleSignUp = async () => {
        if (!validateInputs()) {
            return;
        }

        const usersFileUri = `${FileSystem.documentDirectory}users.json`;
        let users = [];

        try {
            const fileInfo = await FileSystem.getInfoAsync(usersFileUri);
            if (fileInfo.exists) {
                const usersFile = await FileSystem.readAsStringAsync(usersFileUri);
                users = JSON.parse(usersFile);

                if (users.some(user => user.email === email)) {
                    Alert.alert("Email Exists", "This email is already registered");
                    return;
                }
            } else {
                await FileSystem.writeAsStringAsync(usersFileUri, JSON.stringify([]));
            }
        } catch (error) {
            console.log('Error reading users file:', error);
            Alert.alert("Error", "Unable to access users file.");
            return;
        }

        const newUser = { email, password, role, firstName, lastName, phone, bio };

        if (role === 'disabled') {
            users.push(newUser);
            try {
                await FileSystem.writeAsStringAsync(usersFileUri, JSON.stringify(users));
                
                // Save the user data to AsyncStorage
                await AsyncStorage.setItem('user', JSON.stringify(newUser));

                navigation.reset({
                    index: 0,
                    routes: [
                        { name: 'Land' },
                    ],
                });
            } catch (error) {
                console.log('Error writing users file:', error);
                Alert.alert("Sign Up Failed", "An error occurred. Please try again.");
            }
        } else if (role === 'volunteer') {
            // Save the user data to AsyncStorage
            await AsyncStorage.setItem('user', JSON.stringify(newUser));
            
            navigation.navigate('Training', {
                users,
                usersFileUri,
                email,
                password,
                role,
                firstName,
                lastName,
                phone,
                bio,
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
            {/* Input fields for First Name, Last Name, etc. */}
            {/* ... (rest of the inputs and button) */}
            //             {/* New First Name input */}
            <TextInput
                style={styles.input}
                placeholder="First Name"
                placeholderTextColor="#999"
                onChangeText={setFirstName}
                value={firstName}
            />

            {/* New Last Name input */}
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                placeholderTextColor="#999"
                onChangeText={setLastName}
                value={lastName}
            />

            {/* New Phone input */}
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                placeholderTextColor="#999"
                onChangeText={setPhone}
                value={phone}
                keyboardType="phone-pad"
            />

            {/* New Biography input */}
            <TextInput
                style={styles.input}
                placeholder="Biography"
                placeholderTextColor="#999"
                onChangeText={setBio}
                value={bio}
                multiline
                numberOfLines={4}
            />

            {/* Email input */}
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

            {/* Password input */}
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

            {/* Dropdown for selecting role */}
            <Dropdown
                label="Select Role"
                data={roleOptions}
                onSelect={(value) => setRole(value)}
                selectedValue={role}
                placeholder="Select your role"
            />

            {/* Submit Button */}
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
