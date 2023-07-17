import React, { useState } from "react";
import './Register.css';
import { InputText } from "../../common/InputText/InputText";
import { Col, Container, Row } from "react-bootstrap";

import register from '../../assets/images/register.jpg'
import { CustomButton } from "../../common/CustomButton/CustonButton";

export const Register = () => {

    return (
        <div className="registerDesign">
            <div>
                <img
                    src={register}
                    className="registerImage"
                    alt="plant image"
                />
            </div>
            <Container>
                <Row className="registerRow mt-4 mt-md-0">
                    <Col md={12} className="welcomeText">
                        Welcome!
                    </Col>
                    <Col md={12}>
                        <h5 className="secondaryText">Begin your plant care adventure here </h5>
                    </Col>
                </Row>
                <Row className="my-md-3 registerRow">
                    <Col xs={10} md={5}>
                        <InputText
                            label={"Name"}
                            name={"name"}
                            placeholder={"Enter your name"}
                        ></InputText>
                    </Col>
                    <Col xs={10} md={5}>
                        <InputText
                            label={"Surname"}
                            name={"surname"}
                            placeholder={"Enter your surname"}
                        ></InputText>
                    </Col>
                </Row>
                <Row className="my-md-3 registerRow">
                    <Col xs={10} md={5}>
                        <InputText
                            label={"City"}
                            name={"city"}
                            placeholder={"Enter your city/town"}
                        ></InputText>
                    </Col>
                    <Col xs={10} md={5}>
                        <InputText
                            label={"Country"}
                            name={"country"}
                            placeholder={"Enter your country"}
                        ></InputText>
                    </Col>
                </Row>
                <Row className="my-md-3 registerRow">
                    <Col xs={10} md={5}>
                        <InputText
                            label={"Email"}
                            name={"email"}
                            placeholder={"example@example.com"}
                        ></InputText>
                    </Col>
                    <Col xs={10} md={5}>
                        <InputText
                            label={"Password"}
                            name={"password"}
                            placeholder={"********"}
                        ></InputText>
                    </Col>
                </Row>
                <Row className="my-4 my-md-5 registerRow">
                    <Col xs={8} md={8}>
                        <CustomButton
                            name={"Register"}
                        ></CustomButton>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}