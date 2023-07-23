import React from "react";
import './DetailPlant.css';
import { Container, Row, Col } from "react-bootstrap";


export const DetailPlant = () => {


    return (
        <div className="detailPlantDesign">
            <Container className="plantCard">
                <Row>
                    <Col className="cardLeft bg-primary">
                        <div>Common name:</div>
                        <div>Scientific name:</div>
                        <div>Sunlight:</div>
                        <div>Watering:</div>
                    </Col>
                </Row>
                <Row >
                    <Col className="cardRight bg-danger">
                        image
                    </Col>
                </Row>
            </Container>
        </div>
    )
}