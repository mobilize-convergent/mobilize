import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";

const Profile = () => {
  return (
  
    <View style={styles.container}>
   

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <View style={styles.profilePicture} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>Jake M.</Text>
          <Text style={styles.email}>jakem12@gmail.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Options List */}
      <ScrollView>
        <TouchableOpacity style={styles.optionItem}>
          <Text>📍 Location</Text>
          <Text>➡️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text>🌐 Languages</Text>
          <Text>➡️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text>⏳ Clear History</Text>
          <Text>➡️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text>❓ Help</Text>
          <Text>➡️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text>🔓 Log Out</Text>
          <Text>➡️</Text>
        </TouchableOpacity>
      </ScrollView>
 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    justifyContent: "space-between",
    padding: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  settingsButton: {
    fontSize: 18,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  editButton: {
    paddingVertical: 8,
    borderRadius: 4,
  },
  editButtonText: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 16,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
});

export default Profile;
