import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import MapView, { Marker, Callout } from 'react-native-maps'; 
// Assuming useDimensions is a custom hook you've create
import CustomCallout from '../../components/map-callout'; 
import {  Searchbar, Headline, FAB } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import ClassCard from '../../components/class-card';

// TODO: index should consist of 3 main components: search bar, map, and class card
// TODO: Plan for state control render state from index to components?
const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const cardData = [
    { title: 'Piano Lesson', content: 'This is the first card.', imageUrl: 'https://picsum.photos/700?image=10', rating: 3, review_num: 3, location:'Ang Mo Kio', fee:12, availability:['Fri 10am-12pm', 'Sat 12pm-1pm'] },
    { title: 'Second Card', content: 'This is the second card.', imageUrl: 'https://picsum.photos/700?image=20', rating: 3.5, review_num: 10, location:'Jurong West', fee:30, availability:['Mon 10am-12pm'] },
    { title: 'Third Card', content: 'This is the third card.', imageUrl: 'https://picsum.photos/700?image=30', rating: 5, review_num: 1, location:'Woodlands', fee:40, availability:['Fri 10am-12pm', 'Sat 12pm-1pm', 'Sat 5pm-9pm'] },
    { title: 'Fourth Card', content: 'This is the fourth card.', imageUrl: 'https://picsum.photos/700?image=40', rating: 1, review_num: 1, location:'Tampines', fee:25, availability:['Fri 10am-12pm', 'Sat 2pm-5pm'] }
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
          <Headline style={styles.headerStyle}>Browse</Headline>
          {cardData.map((card, index) => (
            <ClassCard
              key={index}
              title={card.title}
              content={card.content}
              imageUrl={card.imageUrl}
              rating={card.rating}
              review_num={card.review_num}
              location={card.location}
              fee={card.fee}
              availability={card.availability}
            />
          ))}
        </View>
      </ScrollView>
      <FAB
        style={styles.fab}
        label="Map"
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
    bottom: 0,
    height: 'auto',
    width: '28%',
    alignSelf: 'center', 
    alignItems: 'center', 
  },
  scrollView: {
    paddingBottom: 80, // Add padding to bottom to ensure nothing is hidden behind the FAB
  },
});

export default HomeScreen;