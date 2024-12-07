import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';  // Import Swipeable

const RouteCard = ({ date, time, route, volunteer, status, onSwipeLeft }) => {

  const renderRightActions = (progress, dragX, routeId) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
    });

    return (
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={onSwipeLeft}
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


  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.headerLeft}>
            <View style={[styles.userIcon, { backgroundColor: volunteer ? '#4CAF50' : '#FF5252' }]}>
              <Icon name="person" size={20} color="white" />
            </View>
            <Text style={styles.dateTime}>{date} at {time}</Text>
          </View>
        </View>

        <View style={styles.routeInfo}>
          <View style={styles.routeLocation}>
            <Icon name="place" size={16} color="#666" />
            <Text style={styles.routeText}>{route}</Text>
          </View>

          {volunteer ? (
            <View style={styles.volunteerTag}>
              <Icon name="person" size={16} color="#666" />
              <Text style={styles.volunteerName}>{volunteer}</Text>
            </View>
          ) : (
            <View style={styles.pendingTag}>
              <Text style={styles.pendingText}>Pending Volunteer</Text>
            </View>
          )}
        </View>
      </View>
    </Swipeable>
  );
};

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
    setRoutes(prevRoutes => [...prevRoutes, newRoute]);
  };

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
            setRoutes(prevRoutes => prevRoutes.filter(route => route !== routeToDelete));

          }
        }
      ]
    );
  };

  useEffect(() => {
    const addRouteListener = navigation.addListener('focus', () => {
      const updatedRoutes = route.params;
      if (updatedRoutes) {
        setRoutes(prevRoutes => [...prevRoutes, ...updatedRoutes]);
      }
    });

    return addRouteListener;
  }, [navigation, route]);

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Home</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.yourRoutesHeader}>
          <Text style={styles.yourRoutes}>Your Routes</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddRoute', {
              routes: routes,
              addRoute: addRoute
            })}
          >
            <Icon name="add" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.routesList}>
          {routes.map((route, index) => (
            <RouteCard
              key={index}
              date={route.date}
              time={route.time}
              route={route.route}
              volunteer={route.volunteer}
              status={route.status}
              onSwipeLeft={() => deleteRoute(route)} // Pass delete function to RouteCard
              navigation={navigation}
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
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  yourRoutesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  yourRoutes: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
  },
  routesList: {
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  dateTime: {
    fontSize: 16,
  },
  routeInfo: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  routeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routeText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  volunteerTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    padding: 8,
    borderRadius: 6,
  },
  volunteerName: {
    marginLeft: 4,
    color: '#666',
  },
  pendingTag: {
    backgroundColor: '#FFE5E5',
    padding: 8,
    borderRadius: 6,
  },
  pendingText: {
    color: '#FF5252',
    textAlign: 'center',
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
    backgroundColor: '#174864',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 35,
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
});

export default StudentHome;