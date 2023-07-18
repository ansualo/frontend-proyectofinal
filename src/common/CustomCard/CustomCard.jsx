import React from 'react';
import './CustomCard.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import image from '../../assets/images/login.jpg'

export const CustomCard = () => {

  return (
    <Card className="bg-dark text-white cardDesign">
    <Card.Img src={image} alt="Card image" />
    <Card.ImgOverlay>
      <Card.Title className="text-dark">Chinese Evergreen</Card.Title>
    </Card.ImgOverlay>
        <Card.Text className="mt-2 mb-0">Part Shade/Full Shade</Card.Text>
        <Card.Text>Average</Card.Text>
  </Card>
  );
}
