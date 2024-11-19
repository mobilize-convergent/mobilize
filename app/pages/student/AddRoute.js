import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Calendar Screen
const Calendar = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 5, 26)); // June 26, 2024
  const [startTime, setStartTime] = useState('8:00 AM');
  const [endTime, setEndTime] = useState('8:00 AM');

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const currentMonth = new Date(2024, 5);
  
  // Generate calendar dates
  const getDaysInMonth = () => {
    const daysInMonth = new Array(35).fill(null);
    const firstDay = new Date(2024, 5, 1).getDay();
    const lastDate = new Date(2024, 5 + 1, 0).getDate();
    
    for (let i = 0; i < lastDate; i++) {
      daysInMonth[i + firstDay] = i + 1;
    }
    
    return daysInMonth;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Routes</Text>
        <View style={styles.monthSelector}>
          <Text style={styles.monthText}>June 2024</Text>
          <View style={styles.monthControls}>
            <TouchableOpacity>
              <Icon name="chevron-left" size={24} color="#1a73e8" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="chevron-right" size={24} color="#1a73e8" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.calendar}>
        <View style={styles.weekDays}>
          {days.map((day, index) => (
            <Text key={index} style={styles.weekDay}>{day}</Text>
          ))}
        </View>
        
        <View style={styles.dates}>
          {getDaysInMonth().map((day, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                styles.dateCell,
                day === 26 && styles.selectedDate
              ]}
              onPress={() => setSelectedDate(new Date(2024, 5, day))}
            >
              {day && <Text style={[
                styles.dateText,
                day === 26 && styles.selectedDateText
              ]}>{day}</Text>}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.timeSection}>
          <View style={styles.timeField}>
            <Text style={styles.timeLabel}>Starts:</Text>
            <View style={styles.timeInput}>
              <Text style={styles.timeText}>{startTime}</Text>
            </View>
          </View>
          
          <View style={styles.timeField}>
            <Text style={styles.timeLabel}>Ends:</Text>
            <View style={styles.timeInput}>
              <Text style={styles.timeText}>{endTime}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => navigation.navigate('RouteDetails', {
              date: selectedDate,
              startTime,
              endTime
            })}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Route Details Screen
const RouteDetails = ({ route, navigation }) => {
  const { date, startTime } = route.params;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Routes</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.dateHeader}>
          <Text style={styles.dateTitle}>
            {date.toLocaleDateString('en-US', { 
              month: 'long', 
              day: 'numeric' 
            })},
          </Text>
          <Text style={styles.dateTitle}>{startTime}</Text>
          <Icon name="event" size={24} color="#1a73e8" />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>To:</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter destination"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>From:</Text>
          <TextInput 
            style={styles.input}
            placeholder="Enter starting point"
          />
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Description / Instructions:</Text>
          <TextInput 
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            placeholder="Enter any additional details"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={() => {
              // Save the route and navigate back to home
              navigation.navigate('StudentHome');
            }}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontWeight: '500',
    color: '#666',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1a73e8',
    marginRight: 8,
  },
  monthControls: {
    flexDirection: 'row',
  },
  calendar: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    color: '#666',
  },
  dates: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  dateCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  selectedDate: {
    backgroundColor: '#1a73e8',
    borderRadius: 20,
  },
  dateText: {
    color: '#000',
  },
  selectedDateText: {
    color: 'white',
  },
  timeSection: {
    marginTop: 24,
  },
  timeField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  timeLabel: {
    width: 60,
    color: '#1a73e8',
  },
  timeInput: {
    backgroundColor: '#f5f5f5',
    padding: 8,
    borderRadius: 4,
    flex: 1,
  },
  timeText: {
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dateTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginRight: 8,
  },
  formField: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#1a73e8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export { Calendar, RouteDetails };