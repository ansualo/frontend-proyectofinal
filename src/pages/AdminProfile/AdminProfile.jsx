import React, { useState } from "react";
import './AdminProfile.css'
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

export const AdminProfile = () => {

    const navigate = useNavigate()

    return (
        <Container className="adminDesign">
            <Row className="adminSettings" >
                <Col xs={12} md={12} className="d-flex flex-column align-items-center">
                    <div className="adminOptions" onClick={() => navigate('/allusers')}>
                        Users settings
                    </div>
                    <div className="adminOptions" onClick={() => navigate('/allplants')}>
                        Plants settings
                    </div>
                </Col>
            </Row>
        </Container>
    )
}