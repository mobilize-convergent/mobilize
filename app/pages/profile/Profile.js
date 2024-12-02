import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

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
      {/* Profile Header with Picture and User Info */}
      <View style={styles.profileHeader}>
        <View style={styles.profilePicture} />
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

      <View style={styles.divider} />

      {/* Profile Options */}
      <ScrollView>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>📍 Location</Text>
          <Text style={styles.optionArrow}>➡️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>🌐 Languages</Text>
          <Text style={styles.optionArrow}>➡️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>⏳ Clear History</Text>
          <Text style={styles.optionArrow}>➡️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text style={styles.optionText}>❓ Help</Text>
          <Text style={styles.optionArrow}>➡️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => navigation.navigate("Land")}
        >
          <Text style={styles.optionText}>🚪 Log Out</Text>
          <Text style={styles.optionArrow}>➡️</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9", // Light background for the profile screen
    paddingHorizontal: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ccc",
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
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
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginVertical: 20,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  optionArrow: {
    fontSize: 18,
    color: "#007bff", // Blue color for the arrow
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