import React from 'react';
import './CustomCard.css';
import Card from 'react-bootstrap/Card';
import image from '../../assets/images/login.jpg'

export const CustomCard = ({ common_name, sunlight, watering }) => {

  return (
    <Card className="bg-dark text-white cardDesign">
    <Card.Img src={image} alt="Card image" />
    <Card.ImgOverlay>
      <Card.Title className="text-dark">{common_name}</Card.Title>
    </Card.ImgOverlay>
        <Card.Text className="mt-2 mb-0">{sunlight}</Card.Text>
        <Card.Text>{watering}</Card.Text>
  </Card>
  );
}
