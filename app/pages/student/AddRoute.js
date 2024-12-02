import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddRoute = ({ route, navigation }) => {
  const { routes: existingRoutes = [] } = route.params || {}; // Fallback to an empty array if routes is undefined

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('08:00');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [timeSelectionType, setTimeSelectionType] = useState('start');
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const handleAddRoute = async () => {
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  
    const newRoute = {
      date: formattedDate,
      time: startTime,
      route: 'place holder', // You might want to add an input for this
      volunteer: 'Jeff J',
      status: 'pending',
    };
  
    // Merge existing routes with the new route
    const updatedRoutes = [...(existingRoutes || []), newRoute];
  
    Alert.alert('Add Route', 'Are you sure you want to add this route?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, Add Route',
        onPress: () => {
          console.log(JSON.stringify(updatedRoutes));
          navigation.navigate('StudentTabs', {
            screen: 'StudentHome',
            params: { updatedRoutes },
          });
        },
      },
    ]);
  };
  

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const daysInMonth = new Array(42).fill(null);

    // Fill current month's dates
    for (let i = 0; i < lastDate; i++) {
      daysInMonth[firstDay + i] = {
        date: i + 1,
        currentMonth: true
      };
    }

    // Fill previous month's dates
    const prevMonthLastDate = new Date(year, month, 0).getDate();
    for (let i = 0; i < firstDay; i++) {
      daysInMonth[i] = {
        date: prevMonthLastDate - firstDay + i + 1,
        currentMonth: false
      };
    }

    // Ensure the calendar has only 7 days in a row
    const weeks = [];
    for (let i = 0; i < daysInMonth.length; i += 7) {
      weeks.push(daysInMonth.slice(i, i + 7));
    }

    return weeks;
  };

  const changeMonth = (increment) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of ['00', '30']) {
        times.push(`${hour.toString().padStart(2, '0')}:${minute}`);
      }
    }
    return times;
  };

  const handleTimeClick = (type, event) => {
    setTimeSelectionType(type);
    setDropdownPosition({
      top: event.nativeEvent.pageY,
      left: event.nativeEvent.pageX
    });
    setDropdownVisible(true);
  };

  const handleTimeSelect = (time) => {
    if (timeSelectionType === 'start') {
      setStartTime(time);
    }
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Routes</Text>
        <View style={styles.monthSelector}>
          <Text style={styles.monthText}>
            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </Text>
          <View style={styles.monthControls}>
            <TouchableOpacity onPress={() => changeMonth(-1)}>
              <Icon name="chevron-left" size={24} color="#1a73e8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeMonth(1)}>
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
          {getDaysInMonth(currentMonth).map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekRow}>
              {week.map((dayObj, dayIndex) => (
                <TouchableOpacity
                  key={dayIndex}
                  style={[
                    styles.dateCell,
                    dayObj?.currentMonth &&
                    dayObj?.date === selectedDate.getDate() &&
                    currentMonth.getMonth() === selectedDate.getMonth() &&
                    styles.selectedDate
                  ]}
                  onPress={() => {
                    if (dayObj?.currentMonth) {
                      const newDate = new Date(currentMonth);
                      newDate.setDate(dayObj.date);
                      setSelectedDate(newDate);
                    }
                  }}
                >
                  {dayObj && <Text style={[
                    styles.dateText,
                    !dayObj.currentMonth && styles.otherMonthDate,
                    dayObj.currentMonth &&
                    dayObj.date === selectedDate.getDate() &&
                    currentMonth.getMonth() === selectedDate.getMonth() &&
                    styles.selectedDateText
                  ]}>
                    {dayObj.date}
                  </Text>}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.timeSection}>
          <View style={styles.timeField}>
            <Text style={styles.timeLabel}>Time:</Text>
            <TouchableOpacity
              style={styles.timeInput}
              onPress={(e) => handleTimeClick('start', e)}
            >
              <Text style={styles.timeText}>{startTime}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isDropdownVisible && (
          <View style={[styles.dropdown, { top: dropdownPosition.top + 40, left: dropdownPosition.left - 100 }]}>
            <ScrollView style={styles.timeDropdown}>
              {generateTimeOptions().map(time => (
                <TouchableOpacity
                  key={time}
                  style={styles.timeOption}
                  onPress={() => handleTimeSelect(time)}
                >
                  <Text>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleAddRoute}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
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
    fontWeight: 'bold',
    color: '#555',
  },
  dates: {
    marginBottom: 16,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  otherMonthDate: {
    color: '#bbb',
  },
  selectedDate: {
    backgroundColor: '#1a73e8',
    borderRadius: 50,
  },
  selectedDateText: {
    color: 'white',
  },
  timeSection: {
    marginBottom: 24,
  },
  timeField: {
    marginBottom: 12,
  },
  timeLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  timeInput: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  timeDropdown: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    maxHeight: 200,
  },
  timeOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdown: {
    position: 'absolute',
    zIndex: 1000,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  deleteButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FF5252',
    borderRadius: 8,
  },
  continueButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});

export { AddRoute };