import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'; 
// Assuming useDimensions is a custom hook you've create
import CustomCallout from '../../components/map-callout'; 
import {  Searchbar,Title, FAB } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import CustomCard from '../../components/class-card';

// TODO: index should consist of 3 main components: search bar, map, and class card
// TODO: Plan for state control render state from index to components?
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const cardData = [
    { title: 'First Card', content: 'This is the first card.', imageUrl: 'https://picsum.photos/700?image=10' },
    { title: 'Second Card', content: 'This is the second card.', imageUrl: 'https://picsum.photos/700?image=20' },
    { title: 'Third Card', content: 'This is the third card.', imageUrl: 'https://picsum.photos/700?image=30' },
    { title: 'Fourth Card', content: 'This is the fourth card.', imageUrl: 'https://picsum.photos/700?image=40' },
    { title: 'Fifth Card', content: 'This is the fifth card.', imageUrl: 'https://picsum.photos/700?image=50' },
    { title: 'Sixth Card', content: 'This is the sixth card.', imageUrl: 'https://picsum.photos/700?image=60' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
        />
        <View style={styles.contentContainer}>
          <Title style={styles.headerStyle}>Browse</Title>
          {cardData.map((card, index) => (
            <CustomCard
              key={index}
              title={card.title}
              content={card.content}
              imageUrl={card.imageUrl}
            />
          ))}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        small
        icon="map" // Check React Native Paper's icons for more options
        onPress={() => console.log("Pressed sticky button")} // Assuming you're using React Navigation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  searchBar: {
    margin: 8,
    marginTop:70,
    elevation: 2,
  },
  contentContainer: {
    padding: 8,
  },
  headerStyle: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  cardStyle: {
    elevation: 4, // Adds shadow
    marginBottom: 20, // Adds bottom margin for spacing between cards
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    left: 0,
    bottom: 0,
    width: '50%',
    alignSelf: 'center', 
  },
  scrollView: {
    paddingBottom: 80, // Add padding to bottom to ensure nothing is hidden behind the FAB
  },
});

export default HomeScreen;