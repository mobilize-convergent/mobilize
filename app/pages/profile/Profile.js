import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.button}
                //onPress={}
                >
                    <Text style={styles.headerText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Edit Profile</Text>
                <TouchableOpacity
                    style={styles.button}
                //onPress={}
                >
                    <Text style={styles.headerText}>Settings</Text>
                </TouchableOpacity>
            </View>
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
                    <Text>:round_pushpin: Location</Text>
                    <Text>:arrow_right:</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text>:globe_with_meridians: Languages</Text>
                    <Text>:arrow_right:</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text>:hourglass_flowing_sand: Clear History</Text>
                    <Text>:arrow_right:</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text>:question: Help</Text>
                    <Text>:arrow_right:</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionItem}>
                    <Text>:unlock: Log Out</Text>
                    <Text>:arrow_right:</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F9F9F9",
        paddingHorizontal: 16,
        justifyContent: "space-between",
    },
    header: {
        backgroundColor: '#F0F0F0',
        padding: 30,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 20,
        paddingTop: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingRight: 65,
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
        paddingVertical: 12,
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