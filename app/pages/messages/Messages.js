import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';

const Messages = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'Adam A.', message: 'I am good, thanks! How about you?', time: '2 min' },
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
        <View style={styles.textContainer}>
          <Text style={styles.senderName}>{item.sender}</Text>
          <Text style={styles.latestMessage}>{item.message}</Text>
        </View>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
   <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Image source={require('../../images/search.png')} style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Message List */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessageItem}
        style={styles.messageList}
      />

      {/* Bottom Navigation Bar - PLACEHOLDERS ICONS FOR NOW */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navIcon}>
          <Image source={require('../../images/person.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon}>
          <Image source={require('../../images/person.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon}>
          <Image source={require('../../images/person.png')} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navIcon}>
          <Image source={require('../../images/person.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#174864',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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
    backgroundColor: '#f5f5f5',
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
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
  },
  textContainer: {
    flex: 1,
  },
  senderName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  latestMessage: {
    fontSize: 14,
    lineHeight: 18,
  },
  messageTime: {
    fontSize: 12,
    marginLeft: 8,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#174864',
    paddingVertical: 30,
  },
  navIcon: {
    padding: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  searchButton: {
    padding: 8,
    position: 'absolute',
    right: 16,
  },
  searchIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default Messages;