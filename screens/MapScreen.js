import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getDatabase, ref, push } from 'firebase/database';
import { MapScreenStyles as styles } from '../styles/Styles';

export default function MapScreen({ navigation, route }) {
  const { latitude, longitude, fromSavedLocation } = route.params;

  const [mapRegion, setMapRegion] = useState({
    latitude: latitude || 60.200692,
    longitude: longitude || 24.934302,
    latitudeDelta: 0.0161,
    longitudeDelta: 0.01105,
  });

  const [isSaved, setIsSaved] = useState(fromSavedLocation);

  const reformatStreetName = (street) => {
    const parts = street.split(' ');
    if (parts.length > 1 && !isNaN(parts[0])) {
        return `${parts.slice(1).join(' ')} ${parts[0]}`;
    }
    return street;
  };

  const fetchAddress = async (lat, lng) => {
    const apikey = process.env.EXPO_PUBLIC_API_KEY;
    const url = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apikey}&location=${lat},${lng}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.results && data.results[0].locations && data.results[0].locations[0]) {
            const location = data.results[0].locations[0];
            const street = reformatStreetName(location.street || "");
            const city = location.adminArea5 || "";
            const postalCode = location.postalCode || "";
            return `${street}, ${postalCode} ${city}`;
        }
    } catch (error) {
        console.error("Error fetching address:", error);
        return null;
    }
  };

  const saveLocationToDatabase = async () => {
    const db = getDatabase();
    const fetchedAddress = await fetchAddress(mapRegion.latitude, mapRegion.longitude);

    if (fetchedAddress) {
        push(ref(db, 'locations/'), {
            address: fetchedAddress, 
            latitude: mapRegion.latitude,
            longitude: mapRegion.longitude
        });
    } else {
        console.log("Failed to fetch the address.");
    }
  };

  const handleSaveLocation = async () => {
    await saveLocationToDatabase();
    setIsSaved(true);
    Alert.alert("Success", "Location saved successfully!");
  }

  return (
    <View style={styles.container}>
      <MapView style={{ flex: 1, width: "100%", height: "100%" }} region={mapRegion}>
        <Marker coordinate={mapRegion} />
      </MapView>

      <TouchableOpacity 
        style={[
          styles.button, 
          isSaved ? styles.buttonDisabled : styles.buttonEnabled
        ]}
        onPress={handleSaveLocation}
        disabled={isSaved}
      >
        <Text style={styles.buttonText}>SAVE LOCATION</Text>
      </TouchableOpacity>
    </View>
  );
}