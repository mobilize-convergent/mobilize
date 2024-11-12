import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Dropdown from '../components/Dropdown';

const SignUp = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleLogin = () => {
        // Disabled jit credentials
        if (role === 'disabled') {
            navigation.navigate('StudentHome');
        }
        // Volunteer credentials
        else if (role === 'volunteer') {
            navigation.navigate('Training');
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

export default SignUp;