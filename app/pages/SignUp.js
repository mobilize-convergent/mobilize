import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Dropdown from '../components/Dropdown';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSignUp = async () => {
        // Use FileSystem.documentDirectory for a writable file location
        const usersFileUri = `${FileSystem.documentDirectory}users.json`;
        console.error("usersFileUri:"+usersFileUri);
        console.log('File URI:', usersFileUri);
        let users = [];
    
        try {
            // Check if the file exists
            const fileInfo = await FileSystem.getInfoAsync(usersFileUri);
            if (fileInfo.exists) {
                // Read the file if it exists
                const usersFile = await FileSystem.readAsStringAsync(usersFileUri);
                users = JSON.parse(usersFile);
                console.error("users: "+JSON.stringify(users));
            } else {
                // Create the file with an empty array if it doesn't exist
                await FileSystem.writeAsStringAsync(usersFileUri, JSON.stringify([]));
            }
        } catch (error) {
            console.log('Error reading users file:', error);
            Alert.alert("Error", "Unable to access users file.");
            return;
        }
    
        // Add the new user to the array
        users.push({ email, password, role });
    
        try {
            // Write the updated array back to the file
            await FileSystem.writeAsStringAsync(usersFileUri, JSON.stringify(users));
            Alert.alert("Sign Up Successful", "You can now log in.", [{ text: "OK" }]);
            navigation.navigate('StudentHome');
        } catch (error) {
            console.log('Error writing users file:', error);
            Alert.alert("Sign Up Failed", "An error occurred. Please try again.", [{ text: "OK" }]);
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