import React from 'react';
import './CustomCard.css';
import Card from 'react-bootstrap/Card';
import image from '../../assets/images/login.jpg'
import waterIcon from '../../assets/icons/water.png'
import sunIcon from '../../assets/icons/sun.png'

export const CustomCard = ({ common_name, sunlight, watering }) => {

  return (
    <Card className="bg-dark text-white cardDesign">
      <Card.Img src={image} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title className="text-dark">{common_name}</Card.Title>
      </Card.ImgOverlay>
      <div className="d-flex justify-content-center">
        <Card.Img className="plantIcon mt-2" src={sunIcon} alt="Card image" />
        <Card.Text className="mb-0 mt-2">{sunlight}</Card.Text>
      </div>
      <div className="d-flex justify-content-center">
        <Card.Img className="plantIcon" src={waterIcon} alt="Card image" />
        <Card.Text>{watering}</Card.Text>
      </div>
    </Card>
  );
}
