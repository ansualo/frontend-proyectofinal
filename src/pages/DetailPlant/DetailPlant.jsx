import React from "react";
import './DetailPlant.css';
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { plantsData } from "../plantSlice";


export const DetailPlant = () => {


    const data = useSelector((state) => state.plant.data);

    console.log(data)

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