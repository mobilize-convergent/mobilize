import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import axios from 'axios'; // To make HTTP requests

const MODEL_URL = 'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta';
const HF_API_KEY = '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';


// CustomMarker Component (unchanged)
const CustomMarker = React.memo(({ title, isSelected }) => (
  <View style={[styles.customMarker, { zIndex: isSelected ? 1 : 0 }]}>
    <View style={[styles.markerPin, isSelected && styles.selectedMarkerPin]}>
      <View style={styles.markerDot} />
    </View>
    <View style={[styles.markerLabelContainer, isSelected && styles.selectedMarkerLabel]}>
      <Text style={styles.markerLabel} numberOfLines={1}>
        {title}
      </Text>
    </View>
  </View>
));

// CustomCallout Component (unchanged)
const CustomCallout = React.memo(({ title, description, accessibility }) => (
  <View style={styles.calloutWrapper}>
    <BlurView intensity={40} tint="dark" style={styles.calloutContainer}>
      <View style={styles.calloutContent}>
        <View style={styles.calloutHeader}>
          <View style={styles.calloutIconContainer}>
            <Feather name="map-pin" size={18} color="#BF5700" />
          </View>
          <View style={styles.calloutTextContainer}>
            <Text style={styles.calloutTitle} numberOfLines={2}>
              {title}
            </Text>
            {description && (
              <Text style={styles.calloutDescription} numberOfLines={3}>
                {description}
              </Text>
            )}
          </View>
        </View>
        {accessibility && (
          <View style={styles.accessibilityContainer}>
            <View style={styles.accessibilityIconContainer}>
              <Feather name="info" size={14} color="#BF5700" />
            </View>
            <Text style={styles.calloutAccessibility} numberOfLines={2}>
              {accessibility}
            </Text>
          </View>
        )}
      </View>
    </BlurView>
    <View style={styles.calloutArrow} />
  </View>
));

// MapScreen Component
const MapScreen = () => {
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [newIssue, setNewIssue] = useState(null);

  // Define the boundaries of the UT Austin area
  const UTAreaBoundaries = {
    latitude: 30.2862,
    longitude: -97.7394,
    latitudeDelta: 0.006,
    longitudeDelta: 0.008,
  };

  const initialRegion = UTAreaBoundaries;

  // New function to check if the map is within the desired area
  const isRegionWithinBounds = (region) => {
    const withinLatitude =
      region.latitude >= UTAreaBoundaries.latitude - 0.05 &&
      region.latitude <= UTAreaBoundaries.latitude + 0.05;

    const withinLongitude =
      region.longitude >= UTAreaBoundaries.longitude - 0.05 &&
      region.longitude <= UTAreaBoundaries.longitude + 0.05;

    return withinLatitude && withinLongitude;
  };

  // New handler for region change
  const handleRegionChangeComplete = useCallback((region) => {
    if (!isRegionWithinBounds(region)) {
      // If scrolled too far, animate back to initial region
      mapRef.current?.animateToRegion(UTAreaBoundaries, 1000);
    }
  }, []);


  // Enhanced buildings array with searchable aliases
  const buildings = [
    {
      id: '1',
      title: "Engineering Education and Research Center",
      description: "Modern study spaces and labs",
      latitude: 30.2881,
      longitude: -97.7355,
      accessibility: "Ramps are narrow and may be difficult to navigate with larger wheelchairs",
      aliases: ["EERC", "Engineering Center", "Research Center"]
    },
    {
      id: '2',
      title: "Perry-Castañeda Library",
      description: "Quiet study environment with resources",
      latitude: 30.2827,
      longitude: -97.7382,
      accessibility: "Elevators often have delayed service times",
      aliases: ["PCL", "Perry Castaneda Library", "Perry Library"]
    },
    {
      id: '3',
      title: "Recreational Sports Center",
      description: "Fitness and wellness facility",
      latitude: 30.2815,
      longitude: -97.7328,
      accessibility: "Disabled doors don't work on the 2nd floor",
      aliases: ["RecSports", "Recreation Center", "Sports Center"]
    },
    {
      id: '4',
      title: "Dobie Center",
      description: "Residence Hall",
      latitude: 30.2832,
      longitude: -97.7414,
      accessibility: "Building is up to disability standards",
      aliases: ["Dobie", "DC", "Dobie Twenty21", "Twenty21"]
    },
    {
      id: '5',
      title: "Student Activity Center",
      description: "Hub for student events and dining",
      latitude: 30.2849,
      longitude: -97.7367,
      accessibility: "Disabled bathrooms on the 2nd floor are not up to standard",
      aliases: ["SAC", "Student Center", "Activity Center"]
    },
    {
      id: '6',
      title: "Gates Dell Complex",
      description: "Computer Science building with advanced labs",
      latitude: 30.2863,
      longitude: -97.7366,
      accessibility: "Main entrance automatic door is not working",
      aliases: ["GDC", "Gates Complex", "Dell Complex"]
    },
    {
      id: '7',
      title: "Clock Tower",
      description: "Iconic building with administrative offices",
      latitude: 30.2862,
      longitude: -97.7394,
      accessibility: "Accessible building, but ramps need maintenance",
      aliases: ["Tower", "Main Building", "UT Tower", "Main Tower"]
    },
    {
      id: '8',
      title: "Jester West",
      description: "Residence hall and dining area",
      latitude: 30.2817,
      longitude: -97.7368,
      accessibility: "5th floor disabled bathrooms are not up to date",
      aliases: ["Jester", "Jester Dorm", "Jester Hall", "JW"]
    },
    {
      id: '9',
      title: "Blanton Museum of Art",
      description: "Art museum with modern and historical exhibits",
      latitude: 30.2808,
      longitude: -97.7373,
      accessibility: "Wheelchair access on the south side only",
      aliases: ["Blanton", "Art Museum", "Blanton Museum"]
    },
    {
      id: '10',
      title: "Biomedical Engineering Building",
      description: "State-of-the-art biomedical labs",
      latitude: 30.2893,
      longitude: -97.7387,
      accessibility: "Elevator is out of service intermittently",
      aliases: ["BME", "Biomedical Building", "Biomedical Labs"]
    },
  ];

  // const initialRegion = {
  //   latitude: 30.2848,
  //   longitude: -97.7355,
  //   latitudeDelta: 0.015,
  //   longitudeDelta: 0.015,
  // };

  // Enhanced search function to check aliases
  const searchBuilding = (query, building) => {
    const normalizedQuery = query.toLowerCase().trim();
    const searchTargets = [
      building.title.toLowerCase(),
      ...(building.aliases || []).map(alias => alias.toLowerCase())
    ];

    return searchTargets.some(target => target.includes(normalizedQuery));
  };

  // Handle building selection (unchanged)
  const handleBuildingSelect = useCallback((building) => {
    Keyboard.dismiss();
    setSearchQuery(building.title);
    setFilteredBuildings([]);
    setIsSearchFocused(false);

    // If clicking the same building, deselect it
    if (selectedBuilding?.id === building.id) {
      setSelectedBuilding(null);
    } else {
      setSelectedBuilding(building);
    }

    // Smooth animation to selected building
    requestAnimationFrame(() => {
      mapRef.current?.animateToRegion({
        latitude: building.latitude,
        longitude: building.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    });
  }, [selectedBuilding]);

  // Handle map press to deselect building (unchanged)
  const handleMapPress = useCallback(() => {
    setSelectedBuilding(null);
    Keyboard.dismiss();
    setIsSearchFocused(false);
  }, []);

  // Updated search change handler to use enhanced search
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    const filtered = buildings.filter((building) =>
      searchBuilding(query, building)
    );
    setFilteredBuildings(filtered);
  }, [buildings]);

  // Handle search input focus (unchanged)
  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
    setFilteredBuildings(buildings);
  }, [buildings]);

  // Handle search input blur (unchanged)
  const handleSearchBlur = useCallback(() => {
    if (!searchQuery) {
      setIsSearchFocused(false);
    }
  }, [searchQuery]);

  // Render markers (unchanged)
  const renderMarkers = useMemo(() =>
    buildings.map((building) => (
      <Marker
        key={building.id}
        coordinate={{
          latitude: building.latitude,
          longitude: building.longitude,
        }}
        onPress={() => handleBuildingSelect(building)}
      >
        <CustomMarker
          title={building.title}
          isSelected={selectedBuilding?.id === building.id}
        />
        <Callout
          tooltip
          onPress={() => handleBuildingSelect(building)}
        >
          <CustomCallout
            title={building.title}
            description={building.description}
            accessibility={building.accessibility}
          />
        </Callout>
      </Marker>
    )),
    [buildings, selectedBuilding, handleBuildingSelect]
  );

  const handleSend = async () => {
    // Check if a building is selected
    if (!searchQuery || searchQuery.trim() === "") {
      Alert.alert("Error", "A building must be selected.", [
        { text: "OK", onPress: () => console.log("Error acknowledged") }
      ]);
      return;
    }

    // Check if newIssue is valid
    if (!newIssue || newIssue.trim() === "") {
      Alert.alert("Error", "Please provide an accessibility issue.", [
        { text: "OK", onPress: () => console.log("No issue provided") }
      ]);
      return;
    }

    try {
      const response = await axios.post(
        MODEL_URL,
        {
          "inputs": "Respond with ONLY 'yes' or 'no'. Strictly one word. Determine if this is a valid accessibility issue on a college campus: " + newIssue,
          "parameters": {
            "max_new_tokens": 3,
            "temperature": 0.1,
            "do_sample": false
          }
        },
        {
          headers: {
            Authorization: `Bearer ${HF_API_KEY}`,
          },
        }
      );

      Alert.alert("Message Sent", "Your accessibility issue has been successfully reported.", [
        { text: "OK", onPress: () => console.log("Issue reported") }
      ]);
    } catch (error) {
      console.error("Error querying GPT-J API: ", error);
      Alert.alert("Error", "There was an issue processing the accessibility issue.", [
        { text: "OK", onPress: () => console.log("Error acknowledged") }
      ]);
    }
  };


  // Rest of the component remains the same (return statement and styles)
  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Map</Text>
      </View>

      <SafeAreaView style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          userInterfaceStyle="dark"
          minZoomLevel={13}
          maxZoomLevel={20}
          onPress={handleMapPress}
          onRegionChangeComplete={handleRegionChangeComplete}
        >
          {renderMarkers}
        </MapView>

        <View style={styles.searchContainer}>
          <BlurView intensity={20} tint="dark" style={styles.searchBarWrapper}>
            <View style={styles.searchInputContainer}>
              <Feather name="search" size={20} color="#BF5700" style={styles.searchIcon} />
              <TextInput
                value={searchQuery}
                onChangeText={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                placeholder="Search buildings..."
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={[styles.searchBar, { fontSize: 16 }]} // Adjust the font size here
              />
            </View>
          </BlurView>

          {isSearchFocused && (
            <BlurView intensity={40} tint="dark" style={styles.searchResultsList}>
              <FlatList
                data={filteredBuildings}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleBuildingSelect(item)}
                    style={styles.searchResultItem}
                    activeOpacity={0.7}
                  >
                    <View style={styles.searchResultContent}>
                      <Feather name="map-pin" size={16} color="#BF5700" style={styles.resultIcon} />
                      <View style={styles.resultTextContainer}>
                        <Text style={styles.searchResultText} numberOfLines={1}>
                          {item.title}
                        </Text>
                        <Text style={styles.searchResultDescription} numberOfLines={1}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                style={{ maxHeight: 300 }}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
              />
            </BlurView>
          )}

          {/* New TextInput below the search bar */}
          <BlurView intensity={20} tint="dark" style={styles.searchBarWrapper}>
            <View style={styles.searchInputContainer}>
              <Feather name="info" size={20} color="#BF5700" style={styles.accessibilityIcon} />
              <TextInput
                value={newIssue}
                onChangeText={setNewIssue}
                placeholder="Add accessibility issue"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={[styles.searchBar, { fontSize: 16, paddingLeft: 7 }]}
              />
              <TouchableOpacity style={styles.button} onPress={handleSend}>
                <Feather name="send" size={20} color="#BF5700" />
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    alignSelf: 'center',
    width: '85%',
    zIndex: 1,
  },
  searchBarWrapper: {
    borderRadius: 16,
    backgroundColor: 'rgba(30, 30, 30, 0.75)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    padding: 0,
    fontWeight: '500',
  },
  searchResultsList: {
    marginTop: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(30, 30, 30, 0.85)',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  searchResultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  searchResultContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultIcon: {
    marginRight: 12,
  },
  resultTextContainer: {
    flex: 1,
  },
  searchResultText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  searchResultDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
  },
  customMarker: {
    alignItems: 'center',
    width: 150,
    position: 'relative',
  },
  markerPin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#BF5700',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  selectedMarkerPin: {
    backgroundColor: '#BF5700',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 4,
  },
  markerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: -2 },
      { translateY: -2 }
    ],
  },
  markerLabelContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    maxWidth: 150,
    position: 'relative',
  },
  selectedMarkerLabel: {
    backgroundColor: 'rgba(191, 87, 0, 0.9)',
  },
  markerLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  calloutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  calloutWrapper: {
    alignItems: 'center',
    marginBottom: 4,
  },
  calloutContainer: {
    width: 300,
    borderRadius: 12,
    backgroundColor: 'rgba(45, 45, 45, 0.9)', // Slightly darker for better contrast
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    padding: 16,
  },
  calloutArrow: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(45, 45, 45, 0.9)', // Matches the background color
    alignSelf: 'center',
  },
  calloutIconContainer: {
    marginRight: 10,
  },
  calloutTextContainer: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  calloutDescription: {
    fontSize: 14,
    color: 'rgba(200, 200, 200, 1)',
    lineHeight: 20,
    marginBottom: 10,
  },
  calloutContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  accessibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8, // Added separation for clarity
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)', // Light divider
    marginTop: 8,
  },
  accessibilityIcon: {
    marginRight: 6,
  },
  accessibilityIconContainer: {
    marginRight: 8,
  },
  calloutAccessibility: {
    fontSize: 13,
    color: 'rgba(180, 180, 180, 1)',
    flex: 1,
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
  textInputWrapper: {
    marginTop: 10,
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#222222',
  },
  newTextInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#333333',
    color: '#fff',
  },
});

export default MapScreen;