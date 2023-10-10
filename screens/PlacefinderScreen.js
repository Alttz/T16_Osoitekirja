import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { PlacefinderScreenStyles as styles } from '../styles/Styles';


export default function PlacefinderScreen({ navigation }) {
    const [searchLocation, onChangeLocation] = useState('');
    const [savedLocations, setSavedLocations] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const locationsRef = ref(db, 'locations/');
        const unsubscribe = onValue(locationsRef, (snapshot) => {
            const data = snapshot.val();
            const locationsArray = data 
                ? Object.keys(data).map(key => ({ id: key, ...data[key] }))
                : [];
            setSavedLocations(locationsArray);
        });

        return () => unsubscribe();
    }, []);

    const findLocation = () => {
        const apikey = process.env.EXPO_PUBLIC_API_KEY;
        const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${apikey}&location=${searchLocation}`;

        fetch(url)
            .then(response => response.json())
            .then(result => {
                const latLng = result.results?.[0].locations?.[0].latLng;
                if (latLng) {
                    navigation.navigate('Map', {
                        latitude: latLng.lat,
                        longitude: latLng.lng,
                        address: searchLocation
                    });
                }
            })
            .catch(error => console.log('error', error));
    };

    const deleteLocation = (locationId) => {
        Alert.alert(
            "Do you want to remove the address?", 
            "The address will be deleted permanently", 
            [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => {
                    const db = getDatabase();
                    const locationRef = ref(db, `locations/${locationId}`);
                    remove(locationRef);
                } }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>PLACEFINDER</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeLocation}
                value={searchLocation}
                placeholder="Type in address"
            />
            <TouchableOpacity style={styles.button} onPress={findLocation}>
                <Text style={styles.buttonText}>SHOW ON MAP</Text>
            </TouchableOpacity>
            <FlatList
                style={styles.fullWidth}
                data={savedLocations}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.listItem}
                        onPress={() => navigation.navigate('Map', {
                            latitude: item.latitude,
                            longitude: item.longitude,
                            fromSavedLocation: true
                        })}
                        onLongPress={() => deleteLocation(item.id)}
                    >
                        <Text style={styles.listText}>{item.address}</Text>
                        <Text style={styles.showOnMapText}>Show on Map</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}