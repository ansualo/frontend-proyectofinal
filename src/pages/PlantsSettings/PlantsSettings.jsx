import React, { useEffect, useState } from "react";
import './PlantsSettings.css'
import { Col, Container, Row } from "react-bootstrap";
import { createPlant, getAllPlants } from "../../services/apiCalls";
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux";
import { savePlant } from "../plantSlice";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { InputText } from "../../common/InputText/InputText";
import { usersData } from "../userSlice";

export const PlantsSettings = () => {

    const [allPlants, setAllPlants] = useState([]);
    const [newPlant, setNewPlant] = useState([]);
    const data = useSelector(usersData)
    const token = data?.credentials?.token
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

    const handleCreate = () => {
        createPlant(newPlant, token)
            .then(() => fetchAllPlants())
            .catch((error) => console.log(error))
    }

    const handleDetail = (plant) => {
        dispatch(savePlant({ data: plant }));
        navigate('/detail');
    };

    return (
        <div className="plantsSettingsDesign">
            <Container>
                <Row className="plantsRow createPlant">
                    <Col sm={10} md={8}>
                        <h4 className="text-center">Create new plant</h4>
                        <InputText
                            label={"Common Name"}
                            name={"common_name"}
                            state={setNewPlant}
                            errorState={() => { }}
                        />
                        <InputText
                            label={"Scientific Name"}
                            name={"scientific_name"}
                            state={setNewPlant}
                            errorState={() => { }}
                        />
                        <InputText
                            label={"Sunlight"}
                            name={"sunlight"}
                            state={setNewPlant}
                            errorState={() => { }}
                        />
                        <InputText
                            label={"Watering"}
                            name={"watering"}
                            state={setNewPlant}
                            errorState={() => { }}
                        />
                    </Col>
                    <Col xs={5} md={2} className="my-3">
                        <CustomButton name="Confirm" onClick={() => handleCreate()}></CustomButton >
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="plantsRow">
                    <Col>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Common Name</th>
                                    <th>Scientific Name</th>
                                    <th>Sunlight</th>
                                    <th>Watering</th>
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
                                                <td>{plant.sunlight}</td>
                                                <td>{plant.watering}</td>
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