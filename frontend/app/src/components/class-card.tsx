import React from 'react';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

interface CustomCardProps {
  title: string;
  content: string;
  imageUrl: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, content, imageUrl }) => {
  return (
    <Card style={{ marginBottom: 20, elevation: 4 }}>
      <Card.Cover source={{ uri: imageUrl }} />
      <Card.Content>
        <Title>{title}</Title>
        <Paragraph>{content}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Cancel</Button>
        <Button>Ok</Button>
      </Card.Actions>
    </Card>
  );
};

export default CustomCard;