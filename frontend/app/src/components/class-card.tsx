import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import StarReview from './star-review';
import { getTheme } from 'react-native-paper/lib/typescript/core/theming';

interface ClassCardProps {
  title: string;
  content: string;
  imageUrl: string;
  rating: number;
  review_num: number;
  location: string;
  fee: number;
  availability: any[];
}

const ClassCard: React.FC<ClassCardProps> = ({ title, content, imageUrl, rating, review_num, location, fee, availability }) => {
  return (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: imageUrl }} />
      <Card.Content>
        <View style={styles.titleContainer}>
          <Title style={styles.title}>{title}</Title>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.row}>
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
            <StarReview 
              rating={rating}
            />
            <Text style={styles.reviewText}>({review_num})</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.locationText, styles.lightColor]}>{location}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.feeText}>S${fee}/hr</Text>
            <Text style={styles.availabilityText}>
              <Text style={styles.availabilityCount}>{availability.length}</Text> slots left
            </Text>
          </View>
          <Paragraph>{availability.join(', ')}</Paragraph>
        </View>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  titleContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    marginRight: 5,
  },
  reviewText: {
    marginLeft: 5,
  },
  feeText: {
    marginRight: 10,
  },
  availabilityText: {
    color: '#888',
  },
  availabilityCount: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  locationText: {
    // Add your custom font and styles here
  },
  lightColor: {
    color: '#aaa',
  },
});

export default ClassCard;
