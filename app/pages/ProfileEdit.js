import React, { useState } from "react"; import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from "react-native";

const ProfileEdit = () => {
  const [formData, setFormData] = useState({
    firstName: "Jake",
    lastName: "Miller",
    phone: "+1 346 123 4567",
    email: "jakem12@gmail.com",
    biography:
      "Engineer by day, adventure-seeker by weekend. I'm a mechanical engineer who loves solving complex problems and tinkering with new gadgets. When I’m not busy at work, you’ll probably find me on the trails with my dog Max, discovering hidden hiking spots, or volunteering at the local shelter.",
  });

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    Alert.alert("Profile Saved", "Your changes have been saved successfully!");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Alert.alert("Back Pressed")}>
          <Text style={styles.headerButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.headerButton}>✓</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profilePictureContainer}>
          <Image source={require('../images/person.png')} style={styles.personIcon} />
          <TouchableOpacity style={styles.cameraIcon}>
            <Text style={styles.cameraText}>📷</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Your Information</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={formData.firstName}
            onChangeText={(value) => handleChange("firstName", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={formData.lastName}
            onChangeText={(value) => handleChange("lastName", value)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={formData.phone}
            onChangeText={(value) => handleChange("phone", value)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleChange("email", value)}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Biography</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={formData.biography}
            onChangeText={(value) => handleChange("biography", value)}
            multiline
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 40,
    backgroundColor: "#F0F0F0",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerButton: {
    fontSize: 22,
  },
  scrollContainer: {
    padding: 16,
  },
  profilePictureContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ccc",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    elevation: 2,
  },
  cameraText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
    paddingBottom: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default ProfileEdit;