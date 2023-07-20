import React, { useEffect, useState } from "react";
import './Profile.css';
import { useSelector } from "react-redux";
import { usersData } from "../userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { InputText } from "../../common/InputText/InputText";
import { getProfile, updateProfile } from "../../services/apiCalls";

export const Profile = () => {

    const data = useSelector(usersData)
    const token = data?.credentials?.token
    const [profileInfo, setProfileInfo] = useState({})
    const [editing, setEditing] = useState(false);
    const [newData, setNewData] = useState({});

    const editHandler = (newData, token) => {
        updateProfile(newData, token)
        .then((res)=>console.log(res))
            .then(setEditing(false));
    }

    useEffect(() => {
        if (!editing) {
            getProfile(token)
                .then((res) => { setProfileInfo(res.data) })
        }
    }, [editing])

    return (
        <div className="profileDesign">
            <Container className="userProfile">
                {editing
                    ? (
                        <Row className="profileRow">
                            <Col xs={12} md={12}>
                                <InputText
                                    label={"Name"}
                                    name={"name"}
                                    placeholder={profileInfo.name}
                                    state={setNewData}
                                    errorState={() => {}}
                                />
                            </Col>
                            <Col sm={12} md={12}>
                                <InputText
                                    label={"Surname"}
                                    name={"surname"}
                                    placeholder={profileInfo.surname}
                                    state={setNewData}
                                    errorState={() => {}}
                                />
                            </Col>
                            <Col sm={12} md={12}>
                                <InputText
                                    label={"City"}
                                    name={"city"}
                                    placeholder={profileInfo.city}
                                    state={setNewData}
                                    errorState={() => {}}
                                />
                            </Col>
                            <Col sm={12} md={12}>
                                <InputText
                                    label={"Country"}
                                    name={"country"}
                                    placeholder={profileInfo.country}
                                    state={setNewData}
                                    errorState={() => {}}
                                />
                            </Col>
                        </Row>
                    )
                    : (
                        <Row className="profileRow">
                            <Col xs={12} md={12}>
                                <div className="profileLabel">Name</div>
                                <div className="profileData">{profileInfo.name}</div>
                            </Col>
                            <Col sm={12} md={12}>
                                <div className="profileLabel">Surname</div>
                                <div className="profileData">{profileInfo.surname}</div>
                            </Col>
                            <Col sm={12} md={12}>
                                <div className="profileLabel">City</div>
                                <div className="profileData">{profileInfo.city}</div>
                            </Col>
                            <Col sm={12} md={12}>
                                <div className="profileLabel">Country</div>
                                <div className="profileData">{profileInfo.country}</div>
                            </Col>
                        </Row>
                    )
                }
                <Row className="profileRow">
                    {editing
                        ? (
                            <Col xs={8} md={6} className="mt-3 mt-md-5">
                                <CustomButton name="Confirm" onClick={() => { editHandler(newData, token) }}></CustomButton >
                            </Col>
                        )
                        : (
                            <Col xs={8} md={6} className="mt-3 mt-md-5">
                                <CustomButton name="Update profile" onClick={() => { setEditing(true) }}></CustomButton >
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </div >
    )
}