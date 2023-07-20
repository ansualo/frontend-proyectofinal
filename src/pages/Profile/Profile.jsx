import React from "react";
import './Profile.css';
import { useSelector } from "react-redux";
import { usersData } from "../userSlice";
import { Col, Container, Row } from "react-bootstrap";

export const Profile = () => {

    const data = useSelector(usersData)

    console.log(data)

    return (
        <div className="profileDesign">
            <Container className="userProfile">
                <Row className="profileRow">
                    <Col xs={12} md={12}>
                        <div className="profileLabel">Name</div>
                        <div className="profileData">{data.data.name}</div>
                    </Col>
                    <Col sm={12} md={12}>
                        <div className="profileLabel">Surname</div>
                        <div className="profileData">{data.data.surname}</div>
                    </Col>
                    <Col sm={12} md={12}>
                        <div className="profileLabel">City</div>
                        <div className="profileData">{data.data.city}</div>
                    </Col>
                    <Col sm={12} md={12}>
                        <div className="profileLabel">Country</div>
                        <div className="profileData">{data.data.country}</div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}