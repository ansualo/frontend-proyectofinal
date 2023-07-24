import React, { useEffect, useState } from "react";
import './DetailPlant.css';
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { plantsData } from "../plantSlice";
import { usersData } from "../userSlice";
import { getMyPlantById, getPlantById } from "../../services/apiCalls";


export const DetailPlant = () => {

    const user = useSelector(usersData)
    const token = user?.credentials?.token
    const data = useSelector((state) => state.plant.data);
    const plant_id = data.plant_id
    const my_plant_id = data.id
    // console.log(data)

    const [generalInfo, setGeneralInfo] = useState({});
    const [specificInfo, setSpecificInfo] = useState({});

    useEffect(() => {
        getPlantById(plant_id)
            .then((res) => setGeneralInfo(res.data[0]))
            .catch((error) => console.log(error))

        getMyPlantById(my_plant_id, token)
            .then((res) => setSpecificInfo(res.data))
            .catch((error) => console.log(error))
    }, [])


    return (
        <div className="detailPlantDesign">
            <Container className="plantCard">
                <Row className="cardLeft">
                    <Col className="colLeft">
                        <div className="d-md-flex ms-4">
                            <h5>Common name:</h5>
                            <h5 className="plantInfo">{generalInfo?.common_name}</h5>
                        </div>
                        <div className="d-md-flex ms-4">
                            <h5>Scientific name:</h5>
                            <h5 className="plantInfo">{generalInfo?.scientific_name}</h5>
                        </div>
                        <div className="d-md-flex ms-4">
                            <h5>Sunlight:</h5>
                            <h5 className="plantInfo">{generalInfo?.sunlight}</h5>
                        </div>
                        <div className="d-md-flex ms-4">
                            <h5>Watering:</h5>
                            <h5 className="plantInfo">{generalInfo?.watering}</h5>
                        </div>
                    </Col>
                    {token
                        ? (<Col className="colLeft">
                            <div className="d-md-flex ms-4">
                                <h5>Name:</h5>
                                <h5 className="plantInfo">{specificInfo?.name}</h5>
                            </div>
                            <div className="d-md-flex ms-4">
                                <h5>Last watering was on:</h5>
                                <h5 className="plantInfo">{specificInfo?.watering_date[0]?.watered_on}</h5>
                            </div>
                            <div className="d-md-flex ms-4">
                                <h5>Next watering will be on :</h5>
                                <h5 className="plantInfo">{specificInfo?.watering_date[0]?.next_date_water}</h5>
                            </div>
                            <div className="d-md-flex ms-4">
                                <h5>How many days between watering:</h5>
                                <h5 className="plantInfo">{specificInfo?.days_between_water}</h5>
                            </div>
                        </Col>)
                        : (<></>)
                    }
                </Row>
                <Row className="cardRight">
                    <Col >
                    </Col>
                </Row>
            </Container>
        </div>
    )
}