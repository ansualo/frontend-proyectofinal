import React, { useEffect, useState } from "react";
import './DetailPlant.css';
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { plantsData } from "../plantSlice";
import { usersData } from "../userSlice";
import { getPlantById } from "../../services/apiCalls";


export const DetailPlant = () => {

    const user = useSelector(usersData)
    const token = user?.credentials?.token
    const data = useSelector((state) => state.plant.data);
    const id = data.plant_id
    // console.log(data)

    const [generalInfo, setGeneralInfo] = useState("");

    
    useEffect(() => {
        getPlantById(id)
            .then((res) => setGeneralInfo(res.data[0]))
            .catch((error) => console.log(error))
    }, [])


    return (
        <div className="detailPlantDesign">
            <Container className="plantCard">
                <Row className="cardLeft">
                    <Col >
                        <div className="generalInfo">
                            <h5>Common name:</h5>
                            <h5 className="ms-4 fw-bold">{generalInfo.common_name}</h5>
                        </div>
                        <div className="generalInfo">
                            <h5>Scientific name:</h5>
                            <h5 className="ms-4 fw-bold">{generalInfo.scientific_name}</h5>
                        </div>
                        <div className="generalInfo">
                            <h5>Sunlight:</h5>
                            <h5 className="ms-4 fw-bold">{generalInfo.sunlight}</h5>
                        </div>
                        <div className="generalInfo">
                            <h5>Watering:</h5>
                            <h5 className="ms-4 fw-bold">{generalInfo.watering}</h5>
                        </div>
                    </Col>
                </Row>
                <Row className="cardRight">
                    <Col >
                    </Col>
                </Row>
            </Container>
        </div>
    )
}