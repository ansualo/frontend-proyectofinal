import React, { useEffect, useState } from "react";
import './MyPlants.css'
import { Col, Container, Row } from "react-bootstrap";
import { getPlantsNotWaterToday, getPlantsWaterToday } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { usersData } from "../userSlice";
import wateringcanIcon from "../../assets/icons/wateringcan.png"
import { Profile } from "../Profile/Profile";

export const MyPlants = () => {

    const data = useSelector(usersData)
    const token = data?.credentials?.token
    const [waterToday, setWaterToday] = useState([]);
    const [notWaterToday, setNotWaterToday] = useState([]);

    useEffect(() => {
        if (waterToday.length === 0) {
            getPlantsWaterToday(token)
                .then((res) => {
                    console.log(res.data)
                    setWaterToday(res.data)
                })
                .catch((error) => console.log(error))
        }
    }, [])

    useEffect(() => {
        if (notWaterToday.length === 0) {
            getPlantsNotWaterToday(token)
                .then((res) => {
                    console.log(res.data)
                    setNotWaterToday(res.data)
                })
                .catch((error) => console.log(error))
        }
    }, [])


    return (
        <div className="myPlantsDesign">
            <Container className="myPlantsContainer containerLeft">
                <Row>
                    <Col>
                        <div className="weatherapp"></div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="profile">
                            <Profile />
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className="myPlantsContainer containerRight">
                <Row className="myPlantsRow">
                    <Col>
                        <div className="rowTitle">Thirsty today</div>
                    </Col>
                    <Col>
                        {waterToday.length > 0

                            ? (waterToday.map((myplant) => {
                                return (
                                    <div className="eachMyPlant" key={myplant.id}>
                                        <h5 className="ms-4">{myplant.name}</h5>
                                        <h6>{myplant.plant.common_name}</h6>
                                        <img src={wateringcanIcon} alt="Watering can" className="wateringcanIcon me-4" />
                                    </div>
                                )
                            })
                            )
                            : (<div></div>)
                        }
                    </Col>
                </Row>
                <Row className="myPlantsRow mb-4">
                    <Col>
                        <div className="rowTitle">Not thirsty yet</div>
                    </Col>
                    <Col>
                        {notWaterToday.length > 0

                            ? (notWaterToday.map((myplant) => {
                                return (
                                    <div className="eachMyPlant" key={myplant.id}>
                                        <h5 className="ms-4">{myplant.name}</h5>
                                        <h6>{myplant.plant.common_name}</h6>
                                        <h5>in {myplant.watering_date[0].days_to_water} days</h5>
                                        <img src={wateringcanIcon} alt="Watering can" className="wateringcanIcon me-4" />
                                    </div>
                                )
                            })
                            )
                            : (<div></div>)
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}