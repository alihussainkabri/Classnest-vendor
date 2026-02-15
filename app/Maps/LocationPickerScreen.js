import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";

export default function LocationPickerScreen() {
  const mapRef = useRef(null);
  const [region, setRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { redirect_screen, class_id } = useLocalSearchParams()

  // Get current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let loc = await Location.getCurrentPositionAsync({});
      const initialRegion = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setRegion(initialRegion);
      setSelectedLocation(initialRegion);
    })();
  }, []);

  // When map stops moving
  const onRegionChangeComplete = (reg) => {
    setSelectedLocation(reg);
  };

  const submitLocation = async () => {
    console.log("Selected location:", selectedLocation);

    const res = await Location.reverseGeocodeAsync({
      latitude: selectedLocation?.latitude,
      longitude: selectedLocation?.longitude,
    });

    if (res.length > 0) {
      const place = res[0];

      const formatted = {
        latitude: selectedLocation?.latitude,
        longitude: selectedLocation?.longitude,
        country: place.country,
        state: place.region,
        city: place.city || place.subregion,
        street: place.street,
        postalCode: place.postalCode,
        fullAddress: `${place.name || ""} ${place.street || ""}, ${place.city || ""
          }, ${place.region || ""}, ${place.country || ""}`,
      };


      router.push({
        pathname: redirect_screen,
        params: {
          class_id : class_id,
          formatted: JSON.stringify(formatted)
        }
      })
    }

  };

  if (!region) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#111" />
      </TouchableOpacity>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        onRegionChangeComplete={onRegionChangeComplete}
      />

      {/* Center pin */}
      <View style={styles.pinContainer}>
        <Ionicons name="location-sharp" size={40} color="#FF3B30" />
      </View>

      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={submitLocation}>
        <Text style={styles.buttonText}>Confirm Location</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position : 'relative'
  },
  pinContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -20,
    marginTop: -40,
  },
  button: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "#111",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    position: "absolute",
    top: 60, // safe area for iOS
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 4,
  },

});
