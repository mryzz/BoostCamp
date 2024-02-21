import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'; 
// Assuming useDimensions is a custom hook you've create
import CustomCallout from '../../components/map-callout'; 
import { Card, Button, Paragraph } from 'react-native-paper';

// TODO: index should consist of 3 main components: search bar, map, and class card
// TODO: Plan for state control render state from index to components?

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* <View>
        <Text>Hello Main Screen</Text>
      </View> */}
      <MapView
        // style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // alignItems: 'center',
    // If you need specific width and height from useDimensions, you can apply them here.
    // However, for full-screen usage, flex: 1 is typically sufficient.
  },
  // headerText: {
  //   fontSize: 24, // Adjust fontSize to match <h1> styling as needed
  //   fontWeight: 'bold',
  //   textAlign: 'center', // Center the text horizontally
  //   marginTop: 20, // Add some top margin
  // },
    map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default HomeScreen;