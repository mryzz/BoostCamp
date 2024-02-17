import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
// Assuming useDimensions is a custom hook you've create
import { CommonActions } from '@react-navigation/native';
import StickyBottomTabs from '../../components/sticky-bottom-tabs';

// TODO: index should consist of 3 main components: search bar, map, and class card
// TODO: Plan for state control render state from index to components?

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        LFGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
      </Text>
      {/* Uncomment below to include StickyBottomTabs in your layout */}
      {/* <StickyBottomTabs /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // If you need specific width and height from useDimensions, you can apply them here.
    // However, for full-screen usage, flex: 1 is typically sufficient.
  },
  headerText: {
    fontSize: 24, // Adjust fontSize to match <h1> styling as needed
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
    marginTop: 20, // Add some top margin
  },
});