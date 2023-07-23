import React, { useEffect, useState } from "react";
import './MyPlants.css'
import { Col, Container, Row } from "react-bootstrap";
import { getPlantsNotWaterToday, getPlantsWaterToday } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { usersData } from "../userSlice";
import wateringcanIcon from "../../assets/icons/wateringcan.png"
import { Profile } from "../Profile/Profile";
import { CustomButton } from "../../common/CustomButton/CustomButton";

export const MyPlants = () => {

    const data = useSelector(usersData)
    const token = data?.credentials?.token
    const [waterToday, setWaterToday] = useState([]);
    const [notWaterToday, setNotWaterToday] = useState([]);
    const [showProfile, setShowProfile] = useState(false)

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

    const handleProfile = () => {
        if (!showProfile){
            setShowProfile(true);
        } else {
            setShowProfile(false);
        }
    }


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
                            {showProfile
                                ? (<>
                                    <CustomButton
                                        name="Hide profile"
                                        onClick={(handleProfile)}>
                                    </CustomButton>
                                    <Profile />
                                </>)
                                : (<CustomButton
                                    name="View profile"
                                    onClick={(handleProfile)}>
                                </CustomButton>
                                )
                            }
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
                                        <div className="plantName">
                                            <h4 className="mx-5 pt-1">{myplant.name}</h4>
                                            <div>{myplant.plant.common_name}</div>
                                        </div>
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
                                        <div className="plantName">
                                            <h4 className="mx-5 pt-1">{myplant.name}</h4>
                                            <div>{myplant.plant.common_name}</div>
                                        </div>
                                        <h6>in {myplant.watering_date[0].days_to_water} days</h6>
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