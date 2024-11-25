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
  View
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
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
const CustomCallout = React.memo(({ title, description, accessibility }) => (
  <View style={styles.calloutWrapper}>
    <BlurView intensity={40} tint="dark" style={styles.calloutContainer}>
      <View style={styles.calloutContent}>
        <View style={styles.calloutHeader}>
          <Feather name="map-pin" size={16} color="#BF5700" style={styles.calloutIcon} />
          <View style={styles.calloutTextContainer}>
            <Text style={styles.calloutTitle} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.calloutDescription} numberOfLines={2}>
              {description}
            </Text>
            <View style={styles.accessibilityContainer}>
              <Feather name="info" size={12} color="#BF5700" style={styles.accessibilityIcon} />
              <Text style={styles.calloutAccessibility}>
                {accessibility}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </BlurView>
    <View style={styles.calloutArrow} />
  </View>
));
const MapScreen = () => {
  const mapRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const buildings = [
    {
      id: '1',
      title: "Engineering Education and Research Center",
      description: "Modern study spaces and labs",
      latitude: 30.2881,
      longitude: -97.7355,
      accessibility: "Accessible building with ramps and elevators",
    },
    {
      id: '2',
      title: "Perry-Castañeda Library",
      description: "Quiet study environment with resources",
      latitude: 30.2827,
      longitude: -97.7382,
      accessibility: "Accessible building with ramps and elevators",
    },
    {
      id: '3',
      title: "Recreational Sports Center",
      description: "Fitness and wellness facility",
      latitude: 30.2815,
      longitude: -97.7328,
      accessibility: "Accessible building with ramps and elevators",
    },
  ];
  const initialRegion = {
    latitude: 30.2848,
    longitude: -97.7355,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  };
  const handleBuildingSelect = useCallback((building) => {
    Keyboard.dismiss();
    setSearchQuery(building.title);
    setFilteredBuildings([]);
    setIsSearchFocused(false);
    setSelectedBuilding(building);
    // Use requestAnimationFrame to ensure smooth animation
    requestAnimationFrame(() => {
      mapRef.current?.animateToRegion({
        latitude: building.latitude,
        longitude: building.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    });
  }, []);
  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
    const filtered = buildings.filter((building) =>
      building.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBuildings(filtered);
  }, [buildings]);
  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
    setFilteredBuildings(buildings);
  }, [buildings]);
  const handleSearchBlur = useCallback(() => {
    if (!searchQuery) {
      setIsSearchFocused(false);
    }
  }, [searchQuery]);
  // Memoize markers to prevent unnecessary re-renders
  const renderMarkers = useMemo(() =>
    buildings.map((building) => (
      <Marker
        key={building.id}
        coordinate={{
          latitude: building.latitude,
          longitude: building.longitude,
        }}
        tracksViewChanges={false}
        onPress={() => setSelectedBuilding(building)}
      >
        <CustomMarker
          title={building.title}
          isSelected={selectedBuilding?.id === building.id}
        />
        <Callout tooltip>
          <CustomCallout
            title={building.title}
            description={building.description}
            accessibility={building.accessibility}
          />
        </Callout>
      </Marker>
    )),
    [buildings, selectedBuilding]
  );
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        userInterfaceStyle="dark"
        minZoomLevel={13}
        maxZoomLevel={20}
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
              style={styles.searchBar}
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
      </View>
    </SafeAreaView>
  );
};
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
  calloutWrapper: {
    alignItems: 'center',
  },
  calloutContainer: {
    width: 280,
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
    marginBottom: 8,
  },
  calloutContent: {
    padding: 16,
  },
  calloutHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  calloutIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  calloutTextContainer: {
    flex: 1,
  },
  calloutTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  calloutDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
    lineHeight: 20,
  },
  accessibilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  accessibilityIcon: {
    marginRight: 6,
  },
  calloutAccessibility: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    flex: 1,
  },
  calloutArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'rgba(30, 30, 30, 0.85)',
    alignSelf: 'center',
  },
});
export default MapScreen;