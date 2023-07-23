import React, { useEffect, useState } from "react";
import './Profile.css';
import { useSelector } from "react-redux";
import { usersData } from "../userSlice";
import { Col, Container, Row } from "react-bootstrap";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { InputText } from "../../common/InputText/InputText";
import { deleteProfile, getProfile, updateProfile } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { CustomModal } from "../../common/CustomModal/CUstomModal";

export const Profile = () => {

    const data = useSelector(usersData)
    const token = data?.credentials?.token
    const [profileInfo, setProfileInfo] = useState({})
    const [editing, setEditing] = useState(false);
    const [newData, setNewData] = useState({});
    const navigate = useNavigate()

    const handleEdit = (newData, token) => {
        updateProfile(newData, token)
            .then(setEditing(false))
            .catch((error) => console.log(error))
    }

    const handleDelete = () => {
        deleteProfile(token)
        .then(navigate('/'))
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        if (!editing) {
            getProfile(token)
                .then((res) => { setProfileInfo(res.data) })
                .catch((error) => console.log(error))
        }
    }, [editing])

    return (
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
                                    errorState={() => { }}
                                />
                            </Col>
                            <Col sm={12} md={12}>
                                <InputText
                                    label={"Surname"}
                                    name={"surname"}
                                    placeholder={profileInfo.surname}
                                    state={setNewData}
                                    errorState={() => { }}
                                />
                            </Col>
                            <Col sm={12} md={12}>
                                <InputText
                                    label={"City"}
                                    name={"city"}
                                    placeholder={profileInfo.city}
                                    state={setNewData}
                                    errorState={() => { }}
                                />
                            </Col>
                            <Col sm={12} md={12}>
                                <InputText
                                    label={"Country"}
                                    name={"country"}
                                    placeholder={profileInfo.country}
                                    state={setNewData}
                                    errorState={() => { }}
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
                            <Col xs={8} md={6} className="mt-3">
                                <CustomButton name="Confirm" onClick={() => { handleEdit(newData, token) }}></CustomButton >
                            </Col>
                        )
                        : (
                            <div className="profileButtons">
                                <Col xs={5} md={5} className="mt-3 ms-md-4">
                                    <CustomButton name="Update" onClick={() => { setEditing(true) }}></CustomButton >
                                </Col>
                                <Col className="mt-3">
                                    <CustomModal
                                        handleDelete={handleDelete} />
                                </Col>
                            </ div>
                        )
                    }
                </Row>
            </Container>
    )
}