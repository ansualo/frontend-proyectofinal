import React, { useState } from "react";
import './Register.css';
import { InputText } from "../../common/InputText/InputText";
import { Col, Container, Row } from "react-bootstrap";
import registerImage from '../../assets/images/register.jpg'
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { registerUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";

export const Register = () => {

    const [userInfo, setUserInfo] = useState({});
    const [inputError, setInputError] = useState({});
    const navigate = useNavigate();

    const register = () => {
        registerUser(userInfo)
        .then((res)=> {
            console.log(res.data),
            navigate('/myplants')
        })
        .catch((error)=> console.log(error))
    }

    return (
        <div className="registerDesign">
            <div>
                <img
                    src={registerImage}
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
                            state={setUserInfo}
                        ></InputText>
                    </Col>
                    <Col xs={10} md={5}>
                        <InputText
                            label={"Surname"}
                            name={"surname"}
                            placeholder={"Enter your surname"}
                            state={setUserInfo}
                        ></InputText>
                    </Col>
                </Row>
                <Row className="my-md-3 registerRow">
                    <Col xs={10} md={5}>
                        <InputText
                            label={"City"}
                            name={"city"}
                            placeholder={"Enter your city/town"}
                            state={setUserInfo}
                        ></InputText>
                    </Col>
                    <Col xs={10} md={5}>
                        <InputText
                            label={"Country"}
                            name={"country"}
                            placeholder={"Enter your country"}
                            state={setUserInfo}
                        ></InputText>
                    </Col>
                </Row>
                <Row className="my-md-3 registerRow">
                    <Col xs={10} md={5}>
                        <InputText
                            label={"Email"}
                            name={"email"}
                            type={"email"}
                            placeholder={"example@example.com"}
                            state={setUserInfo}
                            errorState={setInputError}
                        ></InputText>
                        <div className="errorInput">{inputError.emailError}</div>
                    </Col>
                    <Col xs={10} md={5}>
                        <InputText
                            label={"Password"}
                            name={"password"}
                            type={"password"}
                            placeholder={"********"}
                            state={setUserInfo}
                            errorState={setInputError}
                        ></InputText>
                        <div className="errorInput">{inputError.passwordError}</div>
                    </Col>
                </Row>
                <Row className="my-4 my-md-5 registerRow">
                    <Col xs={8} md={8}>
                        <CustomButton
                            name={"Sign up"}
                            onClick={()=>register()}
                        ></CustomButton>
                    </Col>
                </Row>
                <Row >
                    <Col className="registerRow flex-row">
                        <div className="me-2 mb-5"> Already have an account? </div>
                        <div className="text-primary signup mb-5" onClick={() => { navigate('/login') }}> Log in </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}