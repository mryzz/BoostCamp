import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CustomCallout = (props: { title: any; description: any; }) => {
  // State for title and description
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  return (
    <View style={styles.calloutView}>
      <Text style={styles.calloutTitle}>{title}</Text>
      <Text style={styles.calloutDescription}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  calloutView: {
    width: 200,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutDescription: {
    textAlign: 'center',
  },
});

export default CustomCallout;