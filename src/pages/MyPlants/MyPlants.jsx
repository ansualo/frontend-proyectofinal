import React, { useEffect, useState } from "react";
import './MyPlants.css'
import dayjs from "dayjs";
import { Col, Container, Row } from "react-bootstrap";
import { getPlantsNotWaterToday, getPlantsWaterToday, updateWateringDate } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { usersData } from "../userSlice";
import wateringcanIcon from "../../assets/icons/wateringcan.png"
import { Profile } from "../Profile/Profile";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { savePlant } from "../plantSlice";
import { useNavigate } from "react-router";

export const MyPlants = () => {

    const data = useSelector(usersData)
    const token = data?.credentials?.token
    const [waterToday, setWaterToday] = useState([]);
    const [notWaterToday, setNotWaterToday] = useState([]);
    const [showProfile, setShowProfile] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchPlantsWaterToday = () => {
        getPlantsWaterToday(token)
            .then((res) => {
                setWaterToday(res.data)
            })
            .catch((error) => console.log(error))
    }

    const fetchPlantsNotWaterToday = () => {
        getPlantsNotWaterToday(token)
            .then((res) => {
                const sortedPlants = res.data.sort((a, b) => { 
                    return a.watering_date[0].days_to_water - b.watering_date[0].days_to_water })
                setNotWaterToday(sortedPlants)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchPlantsWaterToday()
        fetchPlantsNotWaterToday()
    }, [])


    const handleWatering = (watering_date) => {

        const today = new Date();
        const watered_on = dayjs(today).format("YYYY-MM-DD")
        const id = watering_date[0].id
        const body = {
            "id": id,
            "watered_on": watered_on
        }

        updateWateringDate(body, token)
            .then(
                fetchPlantsWaterToday(),
                fetchPlantsNotWaterToday()
            )
            .catch((error) => console.log(error))
    }

    const handleProfile = () => {
        if (!showProfile) {
            setShowProfile(true);
        } else {
            setShowProfile(false);
        }
    }

    const handleDetail = (myplant) => {
        dispatch(savePlant({data: myplant}))
        navigate('/detail')
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
                                    <div className="eachMyPlant" key={myplant.id} onClick={() => handleDetail(myplant)}>
                                        <div className="eachRight">
                                            <h4 className="mx-5 pt-2">{myplant.name}</h4>
                                            <div>{myplant.plant.common_name}</div>
                                        </div>
                                        <img src={wateringcanIcon} alt="Watering can" className="wateringcanIcon me-4" onClick={() => handleWatering(myplant.watering_date)} />
                                    </div>
                                )
                            })
                            )
                            : (<div className="happyPlants">Your plants are happy, they don't need to be watered today</div>)
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
                                    <div className="eachMyPlant" key={myplant.id} onClick={() => handleDetail(myplant)}>
                                        <div className="eachRight">
                                            <h4 className="mx-5 pt-2">{myplant.name}</h4>
                                            <div>{myplant.plant.common_name}</div>
                                        </div>
                                        <div className="eachLeft">
                                            <h5 className="mx-md-4 pt-2">in {myplant.watering_date[0].days_to_water} days</h5>
                                            <img src={wateringcanIcon} alt="Watering can" className="wateringcanIcon me-4" onClick={() => handleWatering(myplant.watering_date)} />
                                        </div>
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