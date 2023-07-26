import React from 'react';
import './CustomCard.css';
import Card from 'react-bootstrap/Card';
import waterIcon from '../../assets/icons/water.png'
import sunIcon from '../../assets/icons/sun.png'

export const CustomCard = ({ image, onClick, common_name, scientific_name, sunlight, watering }) => {

  return (
    <Card className="bg-dark text-white cardDesign" onClick={onClick}>
      <Card.Img src={image} alt="Card image" className="imageCard" />
      <Card.Title className="my-2">{common_name}</Card.Title>
      <Card.Subtitle className="mb-2">{scientific_name}</Card.Subtitle >
      <div className="bottomCard">
        <div className="d-flex justify-content-start border-top">
          <Card.Img className="plantIcon mt-3" src={sunIcon} alt="Card image" />
          <Card.Text className="mb-0 mt-3 mb-2">{sunlight}</Card.Text>
        </div>
        <div className="d-flex justify-content-start">
          <Card.Img className="plantIcon mb-2" src={waterIcon} alt="Card image" />
          <Card.Text>{watering}</Card.Text>
        </div>
      </div>
    </Card>
  );
}
