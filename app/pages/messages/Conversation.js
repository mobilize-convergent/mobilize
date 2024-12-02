import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

const Conversation = ({ route, navigation }) => {
    const { contactName } = route.params;
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hey, how are you?', sender: 'UserA' },
        { id: '2', text: 'I am good, thanks! How about you?', sender: 'UserB' },
    ]);

    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: String(messages.length + 1),
                text: newMessage.trim(),
                sender: 'UserA',  // You can alternate between 'UserA' and 'UserB'
            };
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.messageBubble, item.sender === 'UserA' ? styles.userAMessage : styles.userBMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={styles.header}>{contactName}</Text>

            {/* Display messages */}
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.messageList}
                contentContainerStyle={{ paddingBottom: 10 }}
            />

            {/* Input section */}
            <View style={styles.inputSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholderTextColor="#aaa" // Light placeholder text for dark theme
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',  // Dark background for conversation
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',  // Light text for header
    },
    messageList: {
        flex: 1,
        marginBottom: 16,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
    },
    userAMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#001f3d',  // Navy blue for User A
    },
    userBMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#c3c3c3',  // Darker background for User B
    },
    messageText: {
        fontSize: 16,
        color: '#fff',  // Light text inside the message bubble
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#444',  // Darker border
    },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 25,
        backgroundColor: '#2c3e50', // Dark input field
        borderWidth: 1,
        borderColor: '#444',
        marginRight: 10,
        fontSize: 16,
        color: '#fff',  // Light text color in input
    },
    sendButton: {
        backgroundColor: '#2c3e50', // Green send button
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Conversation;