import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Dropdown from '../components/Dropdown';

const SignUp = ({ navigation }) => {
    // New state variables for additional user info
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [bio, setBio] = useState('');

    // Validate inputs
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

        // First Name validation
        if (!firstName) {
            Alert.alert("First Name Required", "Please enter your first name");
            return false;
        }

        // Last Name validation
        if (!lastName) {
            Alert.alert("Last Name Required", "Please enter your last name");
            return false;
        }

        // Phone validation
        const phoneRegex = /^[0-9]{10}$/; // Simple phone number validation for 10 digits
        if (!phoneRegex.test(phone)) {
            Alert.alert("Invalid Phone", "Please enter a valid 10-digit phone number");
            return false;
        }

        // Bio validation (optional but can add length check if necessary)
        if (bio.length > 500) {
            Alert.alert("Biography too long", "Please keep your biography under 500 characters.");
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

        const newUser = {
            email,
            password,
            role,
            firstName,
            lastName,
            phone,
            bio
        };

        if (role === 'disabled') {
            users.push(newUser);
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

            {/* New First Name input */}
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
