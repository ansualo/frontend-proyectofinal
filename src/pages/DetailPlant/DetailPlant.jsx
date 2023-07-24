import React, { useEffect, useState } from "react";
import './DetailPlant.css';
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { plantsData } from "../plantSlice";
import { usersData } from "../userSlice";
import { deleteMyPlant, deleteWateringDate, getMyPlantById, getPlantById, updateMyPlant } from "../../services/apiCalls";
import { InputText } from "../../common/InputText/InputText";
import { useNavigate } from "react-router";
import { CustomButton } from "../../common/CustomButton/CustomButton";

export const DetailPlant = () => {

    const user = useSelector(usersData)
    const token = user?.credentials?.token
    const data = useSelector(plantsData);
    const plant_id = data.data.plant_id
    const id = data.data.id
    const watering_date_id = data?.data?.watering_date?.[0]?.id
    const [generalInfo, setGeneralInfo] = useState({});
    const [specificInfo, setSpecificInfo] = useState({});
    const [editing, setEditing] = useState(false);
    const [newData, setNewData] = useState({ "name": "", "days_between_water": null });
    const navigate = useNavigate()

    const fetchPlants = () => {
        if (plant_id) {
            const my_plant_id = data.data.id

            getPlantById(plant_id)
                .then((res) => setGeneralInfo(res.data[0]))
                .catch((error) => console.log(error))

            getMyPlantById(my_plant_id, token)
                .then((res) => setSpecificInfo(res.data))
                .catch((error) => console.log(error))

        } else {
            const plant_id = data.data.id

            getPlantById(plant_id)
                .then((res) => setGeneralInfo(res.data[0]))
                .catch((error) => console.log(error))
        }
    }

    useEffect(() => {
        fetchPlants()
    }, [])


    const handleEdit = () => {
        updateMyPlant(id, newData, token)
            .then(
                setEditing(false),
                fetchPlants()
            )
            .catch((error) => console.log(error))
    }

    const handleDelete = () => {

        deleteWateringDate(watering_date_id, token)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
        deleteMyPlant(id, token)
            .then(navigate('/myplants'))
            .catch((error) => console.log(error))
    }

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
                    {plant_id
                        ? (editing
                            ? (<>
                                <Col className="colLeft">
                                    <div className="d-md-flex ms-4">
                                        <h5>Name:</h5>
                                        <InputText
                                            name={"name"}
                                            placeholder={specificInfo?.name}
                                            state={setNewData}
                                            errorState={() => { }}
                                        />
                                    </div>
                                    <div className="d-md-flex ms-4">
                                        <h5>How many days between watering:</h5>
                                        <InputText
                                            name={"days_between_water"}
                                            type={"number"}
                                            placeholder={specificInfo?.days_between_water}
                                            state={setNewData}
                                            errorState={() => { }}
                                        />
                                    </div>
                                    <div className="d-md-flex ms-4">
                                        <h5>Last watering was on:</h5>
                                        <h5 className="plantInfo">{specificInfo?.watering_date?.[0]?.watered_on}</h5>
                                    </div>
                                    <div className="d-md-flex ms-4">
                                        <h5>Next watering will be on :</h5>
                                        <h5 className="plantInfo">{specificInfo?.watering_date?.[0]?.next_date_water}</h5>
                                    </div>
                                </Col>
                                <Col xs={8} md={6} className="mt-3">
                                    <CustomButton name="Confirm" onClick={() => { handleEdit(newData, token) }}></CustomButton >
                                </Col>
                            </>
                            )
                            : (
                                <>
                                    <Col className="colLeft">
                                        <div className="d-md-flex ms-4">
                                            <h5>Name:</h5>
                                            <h5 className="plantInfo">{specificInfo?.name}</h5>
                                        </div>
                                        <div className="d-md-flex ms-4">
                                            <h5>How many days between watering:</h5>
                                            <h5 className="plantInfo">{specificInfo?.days_between_water}</h5>
                                        </div>
                                        <div className="d-md-flex ms-4">
                                            <h5>Last watering was on:</h5>
                                            <h5 className="plantInfo">{specificInfo?.watering_date?.[0]?.watered_on}</h5>
                                        </div>
                                        <div className="d-md-flex ms-4">
                                            <h5>Next watering will be on :</h5>
                                            <h5 className="plantInfo">{specificInfo?.watering_date?.[0]?.next_date_water}</h5>
                                        </div>
                                    </Col>
                                    <Row className="d-flex justify-content-evenly mb-3">
                                        <Col xs={5} md={4}>
                                            <CustomButton name="Update" onClick={() => { setEditing(true) }}></CustomButton >
                                        </Col>
                                        <Col xs={5} md={4}>
                                            <CustomButton name="Delete" onClick={() => { handleDelete() }}></CustomButton >
                                        </Col>
                                    </Row>
                                </>
                            )
                        )
                        : (<></>)
                    }
                </Row>
                <Row className="cardRight">
                    <Col >
                    </Col>
                </Row>
            </Container>
        </div >
    )
}