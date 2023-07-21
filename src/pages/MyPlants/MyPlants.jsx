import React, { useEffect, useState } from "react";
import './MyPlants.css'
import { Col, Container, Row } from "react-bootstrap";
import { getMyPlants } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { usersData } from "../userSlice";
import wateringcanIcon from "../../assets/icons/wateringcan.png"

export const MyPlants = () => {

    const data = useSelector(usersData)
    const token = data?.credentials?.token
    const [myPlants, setMyPlants] = useState([]);


    useEffect(() => {
        if (myPlants.length === 0) {
            getMyPlants(token)
                .then((res) => setMyPlants(res.data))
                .catch((error) => console.log(error))
        }
    }, [])



    return (
        <div className="myPlantsDesign">
            <Container>
                <Row className="myPlantsRow">
                    <Col>
                        {myPlants.length > 0

                            ? (myPlants.map((myplant) => {
                                return (
                                    <div className="eachMyPlant">
                                        <h4 className="ms-4">{myplant.name}</h4>
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
            </Container>
        </div>
    )
}