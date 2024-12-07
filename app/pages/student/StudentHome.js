import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const StudentHome = ({ navigation, route }) => {
  const [routes, setRoutes] = useState([
    {
      date: 'Mon, Oct 14',
      time: '7:00 PM',
      route: 'GSB → WCP',
      volunteer: 'Adam A.',
      status: 'confirmed',
    },
    {
      date: 'Tue, Oct 15',
      time: '2:00 PM',
      route: 'EER → GDC',
      volunteer: null,
      status: 'pending',
    },
    {
      date: 'Tue, Oct 15',
      time: '3:45 PM',
      route: 'GDC → JES',
      volunteer: null,
      status: 'pending',
    }
  ]);

  const addRoute = (newRoute) => {
    setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
  };

  useEffect(() => {
    const addRouteListener = navigation.addListener('focus', () => {
      console.log('StudentHome focused');
      const updatedRoutes = route.params;
      if (updatedRoutes) {
        setRoutes((prevRoutes) => [...prevRoutes, ...updatedRoutes]);
      }
    });

    return addRouteListener;
  }, [navigation, route]);

  const deleteRoute = (routeToDelete) => {
    Alert.alert(
      "Delete Route",
      "Are you sure you want to delete this route?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes, Delete",
          style: "destructive",
          onPress: () => {
            setRoutes(current =>
              current.filter(route => route !== routeToDelete)
            );
          }
        }
      ]
    );
  };

  const renderRightActions = (progress, dragX, route) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => deleteRoute(route)}
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

  const RouteCard = ({ route }) => {
    return (
      <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, route)}>
        <View style={styles.card}>
          <View style={styles.cardContent}>
            <View style={styles.cardHeader}>
              <View style={styles.dateContainer}>
                <View style={[styles.userIcon, { backgroundColor: route.volunteer ? '#174864' : '#ff4444' }]}>
                  <Icon name="person" size={20} color="white" />
                </View>
                <Text style={styles.dateText}>{route.date} at {route.time}</Text>
              </View>
            </View>
            
            <View style={styles.routeDetails}>
              <View style={styles.locationContainer}>
                <View style={styles.routeLocation}>
                  <Icon name="place" size={16} color="#e0e0e0" />
                  <Text style={styles.locationText}>{route.route}</Text>
                </View>
              </View>
              
              <View style={styles.studentContainer}>
                {route.volunteer ? (
                  <>
                    <MaterialIcons name="person" size={16} color="#A0A0A0" />
                    <Text style={[styles.studentText, { color: '#A0A0A0' }]}>
                      {route.volunteer}
                    </Text>
                  </>
                ) : (
                  <Text style={[styles.studentText, { color: '#FF4444' }]}>
                    Pending Volunteer
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Routes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddRoute', { routes, addRoute })}
        >
          <Icon name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <ScrollView style={styles.routesList}>
          {routes.map((route, index) => (
            <RouteCard
              key={index}
              route={route}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000', // Dark background
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
  addButton: {
    position: 'absolute',
    right: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#E0E0E0', // Light text
  },
  routeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  routeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationContainer: {
    backgroundColor: '#2C2C2C', // Dark background for location
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#E0E0E0', // Light text
    marginLeft: 8,
  },
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  studentText: {
    fontSize: 14,
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
});

export default StudentHome;