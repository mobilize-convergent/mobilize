import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
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
          <Text style={styles.name}>Jake M.</Text>
          <Text style={styles.email}>jakem12@gmail.com</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

<View style={styles.imageContainer}>
  <View style={styles.line} />
  <Image source={require('images/stars.png')} style={styles.stars} />
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
          <FontAwesome name="question-circle-o" size={20} color="#000" />
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
