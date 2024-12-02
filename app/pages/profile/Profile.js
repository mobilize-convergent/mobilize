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

  // Fetch user data from AsyncStorage when the component mounts
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          setProfileData(JSON.parse(user));
        }
      } catch (error) {
        console.log('Error loading profile data from AsyncStorage', error);
      }
    };

    loadProfileData();
  }, []);

  const updateProfile = (updatedData) => {
    setProfileData(updatedData);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="settings-outline" size={24} color="transparent" />
        <Text style={styles.title}>My Profile</Text>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>
    
      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image source={require('../../images/person.png')} style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {profileData.firstName} {profileData.lastName}
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

  <View style={styles.imageContainer}>
    <View style={styles.line} />
    <Image source={require('../../images/stars.png')} style={styles.stars} />
    <View style={styles.line} />
  </View>
    
      {/* Options List */}
      <ScrollView>
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="location-outline" size={20} color="#000" />
          <Text style={styles.optionText}>Location</Text>
          <Entypo name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <MaterialIcons name="language" size={20} color="#000" />
          <Text style={styles.optionText}>Languages</Text>
          <Entypo name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="time-outline" size={20} color="#000" />
          <Text style={styles.optionText}>Clear History</Text>
          <Entypo name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem}>
          {/* <FontAwesome name="question-circle-o" size={20} color="#000" /> */}
          <Text style={styles.optionText}>Help</Text>
          <Entypo name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={() => navigation.navigate("Land")}>
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
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "#F6F6F6",
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
    color: "#333",
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
    // width: 100, other option - smaller button
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
  },
});

export default Profile;

// OLDER
// import React, { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

// const Profile = ({ navigation }) => {
//   // Define state to hold profile data
//   const [profileData, setProfileData] = useState({
//     firstName: "Jake",
//     lastName: "M.",
//     phone: "+123456789",
//     email: "jakem12@gmail.com",
//     bio: "Software developer passionate about React Native and building mobile apps.",
//   });

//   // Function to update profile data
//   const updateProfile = (updatedData) => {
//     console.log("calling updateProfile");
//     setProfileData(updatedData);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Profile Info */}
//       <View style={styles.profileInfo}>
//         <View style={styles.profilePicture} />
//         <View style={styles.userInfo}>
//           <Text style={styles.name}>{profileData.firstName} {profileData.lastName}</Text>
//           <Text style={styles.email}>{profileData.email}</Text>
//           <TouchableOpacity
//             style={styles.editButton}
//             onPress={() =>
//               navigation.navigate("ProfileEdit", {
//                 profileData,
//                 updateProfile, // Pass updateProfile function to ProfileEdit
//               })
//             }
//           >
//             <Text style={styles.editButtonText}>Edit Profile</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View style={styles.divider} />
//       {/* Options List */}
//       <ScrollView>
//         <TouchableOpacity style={styles.optionItem}>
//           <Text>📍 Location</Text>
//           <Text>➡️</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.optionItem}>
//           <Text>🌐 Languages</Text>
//           <Text>➡️</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.optionItem}>
//           <Text>⏳ Clear History</Text>
//           <Text>➡️</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.optionItem}>
//           <Text>❓ Help</Text>
//           <Text>➡️</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.optionItem}
//           onPress={() => navigation.navigate("Land")}
//         >
//           <Text>🔓 Log Out</Text>
//           <Text>➡️</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9F9F9",
//     paddingHorizontal: 16,
//     justifyContent: "space-between",
//     padding: 60,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   settingsButton: {
//     fontSize: 18,
//   },
//   profileInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 16,
//   },
//   profilePicture: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#ccc",
//     marginRight: 16,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   email: {
//     fontSize: 14,
//     color: "#555",
//     marginVertical: 4,
//   },
//   editButton: {
//     paddingVertical: 8,
//     borderRadius: 4,
//   },
//   editButtonText: {
//     fontSize: 14,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#ccc",
//     marginVertical: 16,
//   },
//   optionItem: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 30,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//   },
//   navbar: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 16,
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//     backgroundColor: "#fff",
//   },
// });

// export default Profile;