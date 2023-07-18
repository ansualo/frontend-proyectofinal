import React, { useState } from "react";
import './Login.css'
import { Col, Container, Row } from "react-bootstrap";
import { CustomButton } from "../../common/CustomButton/CustonButton";
import { InputText } from "../../common/InputText/InputText";

export const Login = () => {

    const [userInfo, setUserInfo] = useState({});
    const [inputError, setInputError] = useState({});


    return (
        <div className="loginDesign">
            <Container className="loginContainer">
                <Row className="loginRow">
                    <Col md={12} className="helloText">
                        Hi there!
                    </Col>
                </Row>
                <Row className="loginRow">
                    <Col xs={10} md={9}>
                        <InputText
                            label={"Email"}
                            name={"email"}
                            placeholder={"example@example.com"}
                            state={setUserInfo}
                            errorState={setInputError}
                        ></InputText>
                        <div className="errorInput">{inputError.emailError}</div>
                    </Col>
                    <Col xs={10} md={9} className="my-3">
                        <InputText
                            label={"Password"}
                            name={"password"}
                            placeholder={"********"}
                            state={setUserInfo}
                            errorState={setInputError}
                        ></InputText>
                        <div className="errorInput">{inputError.passwordError}</div>
                    </Col>
                </Row>
                <Row className="loginRow">
                    <Col xs={8} md={6} className="my-3">
                        <CustomButton
                            name={"Login"}
                            onClick={() => register()}
                        ></CustomButton>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}