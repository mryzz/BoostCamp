import React, { useState } from 'react';
import { View } from 'react-native';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface StarReviewProps {
  rating: number; // Add this line if it's missing
}

const StarReview: React.FC<StarReviewProps> = ({ rating }) => {

  return (
    <View>
      <Stars
        default={rating}
        count={5}
        half={true}
        starSize={50}
        fullStar={<Icon name={'star'} style={[styles.myStarStyle]} />}
        emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]} />}
      />
    </View>
  );
};

const styles = {
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  }
};

export default StarReview;
