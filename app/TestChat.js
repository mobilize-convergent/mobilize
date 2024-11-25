import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const UserHome = () => {
  return (
    <View style={styles.container}>
      {/* Frame 30 */}
      <View style={styles.frame30}></View>

      {/* Status Bar - iPhone */}
      <View style={styles.statusBar}>
        {/* Time */}
        <View style={styles.timeContainer}>
          <Text style={styles.time}>7:00 PM</Text>
        </View>
        {/* Levels */}
        <View style={styles.levels}>
          <View style={styles.cellularConnection}></View>
          <View style={styles.wifi}></View>
          <View style={styles.battery}></View>
        </View>
      </View>

      {/* Hi, John */}
      <Text style={styles.hiJohn}>Hi, John</Text>

      {/* Account Circle Icon */}
      <View style={styles.accountCircle}></View>

      {/* Your Routes */}
      <Text style={styles.yourRoutes}>Your Routes</Text>

      {/* Frame 31 */}
      <View style={styles.frame31}>
        {/* User Check */}
        <View style={styles.userCheck}>
          <View style={styles.icon}></View>
        </View>
        {/* User details */}
        <Text style={styles.date}>Mon, Oct 14 at 7:00 PM</Text>
        <Text style={styles.edit}>Edit</Text>
      </View>

      {/* Another Frame */}
      <View style={styles.frame35}>
        {/* Volunteer Details */}
        <Text style={styles.pendingVolunteer}>Pending Volunteer</Text>
      </View>

      {/* Chat Bubble */}
      <View style={styles.chatBubble}></View>

      {/* Map Icon */}
      <View style={styles.mapIcon}></View>

      {/* Plus Icon */}
      <View style={styles.plusIcon}></View>

      {/* Profile Icon */}
      <View style={styles.profileIcon}></View>

      {/* Home Indicator */}
      <View style={styles.homeIndicator}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 390,
    height: 844,
    left: 269,
    top: 324,
    backgroundColor: '#FFFFFF',
  },
  frame30: {
    position: 'absolute',
    width: 451,
    height: 136,
    left: -23,
    top: -13,
    backgroundColor: '#174864',
  },
  statusBar: {
    position: 'absolute',
    width: 472,
    height: 34,
    left: -48,
    top: -1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingTop: 21,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 6,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 174,
    height: 22,
  },
  time: {
    fontFamily: 'SF Pro',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,
    textAlign: 'center',
    color: '#F2F0F0',
  },
  levels: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 6,
    paddingRight: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 174,
    height: 13,
  },
  cellularConnection: {
    width: 19.2,
    height: 12.23,
    backgroundColor: '#F2F0F0',
  },
  wifi: {
    width: 17.14,
    height: 12.33,
    backgroundColor: '#F2F0F0',
  },
  battery: {
    width: 27.33,
    height: 13,
  },
  hiJohn: {
    position: 'absolute',
    width: 69,
    height: 22,
    left: 73,
    top: 65,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 19,
    lineHeight: 22,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  accountCircle: {
    position: 'absolute',
    width: 37,
    height: 37,
    left: 22,
    top: 59,
    borderRadius: 50,
    backgroundColor: '#B3B3B3',
  },
  yourRoutes: {
    position: 'absolute',
    width: 103,
    height: 22,
    left: 25,
    top: 144,
    fontFamily: 'Roboto',
    fontWeight: 'normal',
    fontSize: 19,
    lineHeight: 22,
    textAlign: 'center',
    color: '#000000',
  },
  frame31: {
    position: 'absolute',
    width: 367,
    height: 96,
    left: 12,
    top: 187,
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 15,
  },
  userCheck: {
    position: 'absolute',
    width: 21,
    height: 22,
    left: 20,
    top: 12,
    border: '2.5px solid #1E1E1E',
  },
  date: {
    position: 'absolute',
    width: 181,
    height: 20,
    left: 113,
    top: 13,
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },
  edit: {
    position: 'absolute',
    width: 27,
    height: 25,
    left: 326,
    top: 10,
    backgroundColor: '#000000',
  },
  frame35: {
    position: 'absolute',
    width: 367,
    height: 95,
    left: 13,
    top: 452,
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 10,
  },
  pendingVolunteer: {
    position: 'absolute',
    width: 131,
    height: 19,
    left: 17,
    top: 7,
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#000000',
  },
  chatBubble: {
    position: 'absolute',
    width: 38,
    height: 34,
    left: 276,
    top: 19,
    backgroundColor: '#B3B3B3',
  },
  mapIcon: {
    position: 'absolute',
    width: 34,
    height: 31,
    left: 179,
    top: 18,
    borderWidth: 4,
    borderColor: '#B0B0B0',
  },
  plusIcon: {
    position: 'absolute',
    width: 32,
    height: 32,
    left: 340,
    top: 139,
    borderWidth: 3,
    borderColor: '#1E1E1E',
  },
  profileIcon: {
    position: 'absolute',
    width: 32,
    height: 32,
    left: 377,
    top: 19,
    borderWidth: 3,
    borderColor: '#B5B1B1',
    borderRadius: 20,
  },
  homeIndicator: {
    position: 'absolute',
    width: 144,
    height: 5,
    left: 'calc(50% - 144px / 2)',
    bottom: 8,
    backgroundColor: '#000000',
    borderRadius: 100,
  },
});

export default UserHome;
