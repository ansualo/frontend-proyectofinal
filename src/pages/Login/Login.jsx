import React, { useState } from "react";
import './Login.css'
import { Col, Container, Row } from "react-bootstrap";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { InputText } from "../../common/InputText/InputText";
import { loginUser } from "../../services/apiCalls";
import { useDispatch } from "react-redux";
import { loginReducer } from "../userSlice";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const [userInfo, setUserInfo] = useState({});
    const [inputError, setInputError] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        loginUser(userInfo)
            .then((res) => {
                dispatch(loginReducer(res))
                if(res.data.role_id === 1){
                    navigate('/admin')
                } else {
                    navigate('/myplants')
                }
            })
            .catch((error) => console.log(error))
    }


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
                            type={"email"}
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
                            type={"password"}
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
                            onClick={(e) => login(e)}
                        ></CustomButton>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}