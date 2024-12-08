import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';

const Messages = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Adam A.', message: 'I am good, thanks! How about you?', time: '2 min' },
    { id: '2', sender: 'Amaya M.', message: 'Hello', time: '5 min' },
    { id: '3', sender: 'John V.', message: 'See you soon!', time: 'Yesterday' },
    { id: '4', sender: 'Paula D.', message: 'In the lobby', time: 'Yesterday' },
  ]);

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() =>
        navigation.navigate('Conversation', {
          contactId: item.id,
          contactName: item.sender,
        })
      }
    >
      <View style={styles.messageContent}>
        <Image 
          source={require('../../images/person.png')} 
          style={styles.personIcon} 
        />
        <View style={styles.textContainer}>
          <Text style={styles.senderName}>{item.sender}</Text>
          <Text style={styles.latestMessage} numberOfLines={1}>
            {item.message}
          </Text>
        </View>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#1A2838" 
      />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Deep dark background
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
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingBottom: 20,
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: '#1e1e1e', // Dark message background
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 12, // Rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  messageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  personIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#174864', // Border for profile image
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  senderName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#174864', // Light text for sender name
    marginBottom: 4,
  },
  latestMessage: {
    fontSize: 14,
    color: '#A0AEC0', // Muted text for message preview
    lineHeight: 18,
  },
  messageTime: {
    fontSize: 12,
    color: '#718096', // Muted time text
    marginLeft: 8,
  },
});

export default Messages;