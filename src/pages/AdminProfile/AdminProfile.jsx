import React, { useState } from "react";
import './AdminProfile.css'
import { Col, Container, Row } from "react-bootstrap";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { Profile } from "../Profile/Profile";

export const AdminProfile = () => {

    return (
        <Container className="adminDesign">
            <Row className="adminSettings" >
                <Col xs={12} md={12} className="d-flex flex-column align-items-center">
                        <div className="adminOptions">
                            Users settings
                        </div>
                        <div className="adminOptions">
                            Plants settings
                        </div>
                </Col>
            </Row>
        </Container>
    )
}