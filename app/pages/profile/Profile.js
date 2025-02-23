import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Profile = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    bio: "",
  });

  // Fetch the logged-in user's data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const user = await AsyncStorage.getItem('user'); // Fetch data from AsyncStorage
        if (user) {
          setProfileData(JSON.parse(user)); // Set profile data from the logged-in user
          console.log("user:"+JSON.stringify(user));
        }
      } catch (error) {
        console.log('Error loading profile data from AsyncStorage', error);
      }
    };

    loadProfileData();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const updateProfile = (updatedData) => {
    setProfileData(updatedData); // Update the profile data in the component state
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image source={require('../../images/person.png')} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {/* make this not hard coded */}
            {profileData.firstName+" "+profileData.lastName}
          </Text>
          <Text style={styles.userEmail}>{profileData.email}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("ProfileEdit", {
                profileData,
                updateProfile,
              })
            }
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>


      {/* Options List */}
      <ScrollView>

        <TouchableOpacity style={styles.optionItem}>
          <MaterialIcons name="language" size={20} color="#000" />
          <Text style={styles.optionText}>Languages</Text>
          <Entypo name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <MaterialIcons name="help" size={20} color="#000" />
          <Text style={styles.optionText}>Help</Text>
          <Entypo name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.reset({
            index: 0,
            routes: [
              { name: 'Land' }
            ],
          })}
        >
          <Ionicons name="log-out-outline" size={20} color="#000" />
          <Text style={styles.optionText}>Log Out</Text>
          <Entypo name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000', // Dark background
  },
  header: {
    backgroundColor: '#000000', // Very dark header
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 35,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Dark border
  },
  headerTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    position: 'absolute',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 10,
  },
  stars: {
    resizeMode: 'contain',
  },
  line: {
    width: '90%',
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },

  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  profilePicture: {
    color: "#174864",
    width: 90,
    height: 90,
    borderRadius: 40,
  },
  userInfo: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E0E0E0",
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
    marginVertical: 5,
  },
  editButton: {
    backgroundColor: "#174864",
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 8,
    paddingHorizontal: 6,
    flexShrink: 1,
  },
  editButtonText: {
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: 'white'
  },
});

export default Profile;
