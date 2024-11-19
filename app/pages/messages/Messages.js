import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Importing FontAwesome icons

const Messages = ({ navigation }) => {
    // Sample contacts list
    const contacts = [
        { id: '1', name: 'Jitty John' },
        { id: '2', name: 'Yiggity Yam' },
        { id: '3', name: 'Blibbity Bob' },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.contactItem}
                        onPress={() => navigation.navigate('Conversation', { contactId: item.id, contactName: item.name })}
                    >
                        <Icon name="user" size={30} color="black" style={styles.contactIcon} />  {/* Green person icon */}
                        <Text style={styles.contactName}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    contactIcon: {
        marginRight: 10,
    },
    contactName: {
        fontSize: 18,
    },
});

export default Messages;