import React, { useEffect, useState } from "react";
import './DetailPlant.css';
import dayjs from "dayjs";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { plantsData } from "../plantSlice";
import { usersData } from "../userSlice";
import { createMyPlant, createWateringDate, deleteMyPlant, deleteWateringDate, getMyPlantById, getPlantById, updateMyPlant } from "../../services/apiCalls";
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
    const [newPlant, setNewPlant] = useState(false);
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

    const handleAddPlant = async () => {
        const today = new Date();
        const watered_on = dayjs(today).format("YYYY-MM-DD")

        try {
            const newPlantResponse = await createMyPlant(id, newData, token);
            const plantId = newPlantResponse?.data?.id

            const newWater = {
                "my_plant_id": plantId,
                "watered_on": watered_on
            }

            await createWateringDate(newWater, token)

            navigate('/myplants');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="detailPlantDesign">
            <Container className="plantCard">
                <Row className="cardLeft">
                    {/* general information of the plant */}
                    <Col className="colLeft">
                        <div className="d-md-flex ms-4 mb-md-1">
                            <h5>Common name:</h5>
                            <h5 className="plantInfo">{generalInfo?.common_name}</h5>
                        </div>
                        <div className="d-md-flex ms-4 mb-md-1">
                            <h5>Scientific name:</h5>
                            <h5 className="plantInfo">{generalInfo?.scientific_name}</h5>
                        </div>
                        <div className="d-md-flex ms-4 mb-md-1">
                            <h5>Sunlight:</h5>
                            <h5 className="plantInfo">{generalInfo?.sunlight}</h5>
                        </div>
                        <div className="d-md-flex ms-4 mb-md-1">
                            <h5>Watering:</h5>
                            <h5 className="plantInfo">{generalInfo?.watering}</h5>
                        </div>
                        <div className="d-md-flex ms-4 mb-md-1">
                            <h5>Flowers:</h5>
                            <h5 className="plantInfo">{generalInfo?.flowers ? "Yes" : "No"}</h5>
                        </div>
                        <div className="d-md-flex ms-4 mb-md-1">
                            <h5>Poisonous to pets:</h5>
                            <h5 className="plantInfo">{generalInfo?.poisonous_to_pets ? "Yes" : "No"}</h5>
                        </div>
                    </Col>
                    {plant_id
                        // the user has the plant in my plants
                        ? (editing
                            // editing specific plant information
                            ? (<>
                                <Col className="colLeft">
                                    <div className="ms-3" >
                                        <InputText
                                            label={"Name:"}
                                            name={"name"}
                                            placeholder={specificInfo?.name}
                                            state={setNewData}
                                            errorState={() => { }}
                                        />
                                    </div>
                                    <div className="ms-3">
                                        <InputText
                                            label={"How many days between watering:"}
                                            name={"days_between_water"}
                                            type={"number"}
                                            placeholder={specificInfo?.days_between_water}
                                            state={setNewData}
                                            errorState={() => { }}
                                        />
                                    </div>
                                </Col>
                                <Col xs={8} md={6} className="my-2">
                                    <CustomButton name="Confirm" onClick={() => { handleEdit(newData, token) }}></CustomButton >
                                </Col>
                            </>
                            )
                            // not editing specific information
                            : (<>
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
                        // the user doesn't have the plant in my plants
                        : (
                            (token
                                ? (newPlant
                                    ? (<>
                                        <Col xs={10} md={10}>
                                            <div className="">
                                                <InputText
                                                    label={"Name:"}
                                                    name={"name"}
                                                    placeholder={specificInfo?.name}
                                                    state={setNewData}
                                                    errorState={() => { }}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <InputText
                                                    label={"How many days between watering:"}
                                                    name={"days_between_water"}
                                                    type={"number"}
                                                    placeholder={specificInfo?.days_between_water}
                                                    state={setNewData}
                                                    errorState={() => { }}
                                                />
                                            </div>
                                        </Col>
                                        <Col xs={5} md={6} className="mb-4">
                                            <CustomButton name="Confirm" onClick={() => { handleAddPlant() }}></CustomButton >
                                        </Col>
                                    </>)
                                    : (
                                        <Col xs={8} md={6} className="mb-4">
                                            <CustomButton name="Add to my plants" onClick={() => { setNewPlant(true) }}></CustomButton >
                                        </Col>
                                    )
                                )
                                : (<></>)
                            )
                        )
                    }
                </Row >
                <Row className="cardRight">
                    <Col className="m-0 p-0">
                        <img src={generalInfo.image} alt="Plant image" className="cardRight" />
                    </Col>
                </Row>
            </Container >
        </div >
    )
}