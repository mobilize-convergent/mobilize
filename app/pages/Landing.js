import React, { useState } from 'react'; import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const Landing = ({ navigation }) => {
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
              { name: 'StudentTabs' }
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
      <View style={styles.topContainer}>
        <View style={styles.logoContainer}>
          <View style={styles.logo} />
        </View>
        <Text style={styles.welcomeText}>Welcome to Mobilize!</Text>
        <Text style={styles.subText}>Please enter your details.</Text>
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
        <View style={styles.passwordContainer}>
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
          <TouchableOpacity style={styles.eyeIcon}>
            <Text>👁️</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.registerLink}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#D3D3D3',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: '#A9A9A9',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 16,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputPassword: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    padding: 5,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#174864',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#174864',
    marginBottom: 30,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  registerText: {
    fontSize: 14,
    color: '#A9A9A9',
  },
  registerLink: {
    fontSize: 14,
    color: '#174864',
    fontWeight: '600',
  },
});

export default Landing;