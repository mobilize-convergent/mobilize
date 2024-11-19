import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Messages = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Adam A.', message: 'Where are you?', time: '2 min' },
    { id: '2', sender: 'Amaya M.', message: 'Hello', time: '5 min' },
    { id: '3', sender: 'John V.', message: 'See you soon!', time: 'Yesterday' },
    { id: '4', sender: 'Paula D.', message: 'In the lobby', time: 'Yesterday' },
    { id: '5', sender: 'Tyler C.', message: 'Thanks, see you next time', time: 'Friday' },
    { id: '6', sender: 'Aryan M.', message: 'No problem!', time: 'Thursday' },
    { id: '7', sender: 'Jeanne A.', message: 'Sounds good', time: 'Wednesday' },
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
        <Image source={require('../../images/person.png')} style={styles.personIcon} />
        <View>
          <Text style={styles.senderName}>{item.sender}</Text>
          <Text style={styles.latestMessage}>{item.message}</Text>
        </View>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        style={styles.messageList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#2a2d34',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButton: {
    padding: 8,
  },
  messageList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  messageContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  personIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  latestMessage: {
    fontSize: 14,
    color: '#666',
  },
  messageTime: {
    fontSize: 14,
    color: '#999',
  },
});

export default Messages;