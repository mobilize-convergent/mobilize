import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RouteCard = ({ date, time, route, volunteer, status, navigation }) => (
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
);

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

  // useEffect(() => {
  //   const addRoute = navigation.addListener('focus', () => {
  //     console.log('StudentHome focused');
  //     const updatedRoutes = route.params;
  //     console.log('Updated routes:', updatedRoutes);

  //     if (updatedRoutes) {
  //       console.log('Updated routes:', updatedRoutes);
  //       setRoutes([...routes, ...updatedRoutes]);
  //     }
  //   });

  //   return addRoute;
  // }, [navigation, route, routes]);

  // The addRoute function should be passed down to the AddRoute screen
  const addRoute = (newRoute) => {
    setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
  };

  useEffect(() => {
    const addRouteListener = navigation.addListener('focus', () => {
      console.log('StudentHome focused');
      const updatedRoutes = route.params;
      console.log('Updated routes:', updatedRoutes);

      if (updatedRoutes) {
        setRoutes((prevRoutes) => [...prevRoutes, ...updatedRoutes]);
      }
    });

    return addRouteListener;
  }, [navigation, route]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Routes</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddRoute', { routes, addRoute })}
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
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
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
});

export default StudentHome;