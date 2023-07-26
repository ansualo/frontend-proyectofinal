import React, { useEffect, useState } from "react";
import './PlantsSettings.css'
import { Col, Container, Row } from "react-bootstrap";
import { getAllPlants } from "../../services/apiCalls";
import Table from 'react-bootstrap/Table';
import { useDispatch } from "react-redux";
import { savePlant } from "../plantSlice";
import { useNavigate } from "react-router-dom";

export const PlantsSettings = () => {

    const [allPlants, setAllPlants] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchAllPlants = () => {
        getAllPlants()
            .then((res) => {
                setAllPlants(res.data)
                console.log(res.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchAllPlants()
    }, [])

    const handleDetail = (plant) => {
        dispatch(savePlant({ data: plant }));
        navigate('/detail');
    };


    return (
        <div className="plantsSettingsDesign">
            <Container className="createPlantContainer bg-primary">
                <Row>
                    <Col>
                    </Col>
                </Row>
            </Container>
            <Container className="allPlantsContainer">
                <Row className="plantsRow">
                    <Col xs={12} md={6}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Common Name</th>
                                    <th>Scientific Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPlants.length > 0
                                    ? (allPlants.map((plant) => {
                                        return (
                                            <tr key={plant.id} onClick={() => handleDetail(plant)}>
                                                <td>{plant.id}</td>
                                                <td>{plant.common_name}</td>
                                                <td>{plant.scientific_name}</td>
                                            </tr>
                                        )
                                    })
                                    )
                                    : (<></>)
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}