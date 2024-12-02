import React, { useState } from 'react';  
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Conversation = ({ route, navigation }) => {
    // default name - was getting errors before
    const contactName = route?.params?.contactName || 'Unknown';
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hey, how are you?', sender: 'UserA', seenAt: '9:40 AM' },
        { id: '2', text: 'I am good, thanks! How about you?', sender: 'UserB', seenAt: '9:41 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: String(messages.length + 1),
                text: newMessage.trim(),
                sender: 'UserB', 
                seenAt: null, 
            };
            setMessages((prevMessages) => [...prevMessages, message]);
            setNewMessage('');
        }
    };

    const renderItem = ({ item }) => (
        <View style={[styles.messageBubble, item.sender === 'UserA' ? styles.userAMessage : styles.userBMessage]}>
            <Text style={[styles.messageText, item.sender === 'UserA' ? styles.userAMessage : styles.messageText]} >{item.text}</Text>

            {item.sender === 'UserB' && item.seenAt && (
                <Text style={styles.seenText}>Seen {item.seenAt}</Text>
            )}
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../../images/back.png')} style={styles.headerIcon} />
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Image source={require('../../images/person.png')} style={styles.profileIcon} />
                    <Text style={styles.headerText}>{contactName}</Text>
                  
                </View>
                <TouchableOpacity onPress={() => console.log('Call button pressed')}>
                    <Image source={require('../../images/call.png')} style={styles.headerIcon} />
                </TouchableOpacity>
            </View>

            {/* Display messages */}
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.messageList}
                contentContainerStyle={{ paddingBottom: 10 }}
            />

            {/* Input Section */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                <View style={styles.inputSection}>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={newMessage}
                        onChangeText={setNewMessage}
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                           <Image source={require('../../images/send.png')} style={styles.headerIcon} />
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        paddingTop: 35,
        backgroundColor: '#D9D9D9',
    },
    headerCenter: {
        flexDirection: 'column', 
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginTop: 8, 
    },
    profileIcon: {
        width: 50,
        height: 50,
        borderRadius: 20,
        
    },
    headerIcon: {
        width: 30,
        height: 30,
        paddingHorizontal: 16,
        padding: 16,
    },

    messageList: {
        flex: 1,
        marginBottom: 16,
        padding: 16,
        paddingTop: 20,
    },
    messageBubble: {
        maxWidth: '80%',
        marginTop: 8,
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
   
    },
    userAMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#D9D9D9',
        color: 'black',
    },
    userBMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#2c3e50',
    },
    messageText: {
        fontSize: 16,
        color: '#fff',
    },
    seenText: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 4, 
    },
    inputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 40,
        padding: 16,

    },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 25,
        borderWidth: 1,
        marginRight: 10,
        fontSize: 16,
 
    },
    sendButton: {
      width: 30, 
      height: 30,
      color: '#2c3e50',
    },

});
export default Conversation;