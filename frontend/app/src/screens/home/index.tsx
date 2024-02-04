import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Assuming useDimensions is a custom hook you've created
import useDimensions from '../../hooks/useDimensions';
import StickyBottomTabs from '../../components/sticky-bottom-tabs';

export default function HomeScreen() {
  const { screenWidth, screenHeight } = useDimensions();

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