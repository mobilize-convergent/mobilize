import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const VolunteerHome = () => {
  const [activeTab, setActiveTab] = useState('your-routes');
  const [yourRoutes, setYourRoutes] = useState([
  ]);

  const [availableRoutes, setAvailableRoutes] = useState([
    { id: '1', date: 'Tue, Dec 11 at 8:00 AM', from: 'JES', to: 'GDC', student: 'Jonathan M.' },
    { id: '2', date: 'Tue, Nov 12 at 8:30 PM', from: 'MAI', to: 'GDC', student: 'Reagan M.' },
    { id: '3', date: 'Wed, Nov 13 at 9:45 AM', from: 'EER', to: 'JES', student: 'Zoe K.' },
  ]);

  const handleDelete = (routeId) => {
    Alert.alert(
      "Unassign Route",
      "Are you sure you want to unassign yourself from this route?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes, Unassign",
          style: "destructive",
          onPress: () => {
            const routeToMove = yourRoutes.find(route => route.id === routeId);
            if (routeToMove) {
              const availableRoute = {
                ...routeToMove,
                student: routeToMove.student
              };
              setYourRoutes(current =>
                current.filter(route => route.id !== routeId)
              );
              setAvailableRoutes(current => [...current, availableRoute]);
            }
          }
        }
      ]
    );
  };

  const handleAssign = (routeId) => {
    Alert.alert(
      "Assign Route",
      "Are you sure you want to sign yourself up for this route?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes, Sign Up",
          style: "default",
          onPress: () => {
            const routeToMove = availableRoutes.find(route => route.id === routeId);
            if (routeToMove) {
              const assignedRoute = {
                ...routeToMove,
                student: routeToMove.student
              };
              setAvailableRoutes(current =>
                current.filter(route => route.id !== routeId)
              );
              setYourRoutes(current => [...current, assignedRoute]);
            }
          }
        }
      ]
    );
  };

  const renderRightActions = (progress, dragX, routeId) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => handleDelete(routeId)}
      >
        <Animated.View
          style={[
            styles.deleteActionContent,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          <MaterialIcons name="delete" size={24} color="white" />
          <Text style={styles.deleteActionText}>Delete</Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const RouteCard = ({ route, isYourRoute }) => {
    const card = (
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.dateContainer}>
            <View style={styles.userIcon}>
              <MaterialIcons name="person" size={20} color="white" />
            </View>
            <Text style={styles.dateText}>{route.date}</Text>
          </View>
          {/* {isYourRoute && (
            <TouchableOpacity>
              <MaterialIcons name="edit" size={20} color="#a0a0a0" />
            </TouchableOpacity>
          )} */}
        </View>

        <View style={styles.routeDetails}>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{route.from} → {route.to}</Text>
          </View>
          <View style={styles.studentContainer}>
            <MaterialIcons name="person" size={16} color="#a0a0a0" />
            <Text style={styles.studentText}>{route.student || 'Available'}</Text>
          </View>
        </View>

        {!isYourRoute && (
          <TouchableOpacity
            style={styles.availableButton}
            onPress={() => handleAssign(route.id)}
          >
            <Text style={styles.availableButtonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>
    );

    if (isYourRoute) {
      return (
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRightActions(progress, dragX, route.id)
          }
          rightThreshold={40}
        >
          <View style={styles.card}>
            {card}
          </View>
        </Swipeable>
      );
    }

    return <View style={styles.card}>{card}</View>;
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'your-routes' && styles.activeTab]}
            onPress={() => setActiveTab('your-routes')}
          >
            <Text style={styles.tabText}>Your Routes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'available-routes' && styles.activeTab]}
            onPress={() => setActiveTab('available-routes')}
          >
            <Text style={styles.tabText}>Available Routes</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.routesList}>
          {(activeTab === 'your-routes' ? yourRoutes : availableRoutes).map((route) => (
            <RouteCard
              key={route.id}
              route={route}
              isYourRoute={activeTab === 'your-routes'}
            />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000', // Dark background
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e', // Slightly lighter than background
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#2c2c2c', // Dark elevated state
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    textAlign: 'center',
    color: '#e0e0e0', // Light text
  },
  routesList: {
    flex: 1,
  },
  card: {
    backgroundColor: '#1e1e1e', // Dark card background
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#174864',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#e0e0e0', // Light text
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  locationContainer: {
    backgroundColor: '#2c2c2c', // Dark background for location
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#e0e0e0', // Light text
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  studentText: {
    fontSize: 14,
    color: '#a0a0a0', // Slightly muted text
  },
  availableButton: {
    backgroundColor: '#174864',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 12,
  },
  availableButtonText: {
    color: '#121212', // Dark text on green button
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteAction: {
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 12,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteActionContent: {
    flex: 1,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  deleteActionText: {
    color: 'white',
    fontWeight: '600',
    padding: 8,
  },
  header: {
    backgroundColor: '#0a0a0a', // Very dark header
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
});

export default VolunteerHome;