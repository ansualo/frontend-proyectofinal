import React, { useEffect, useState } from "react"
import './AllUsers.css'
import { Col, Row, Container } from "react-bootstrap";
import { deleteProfileAsAdmin, getAllUsers, getDeletedUsers, restoreProfile } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { usersData } from "../userSlice";
import { CustomButton } from "../../common/CustomButton/CustomButton";
import { useNavigate } from "react-router";

export const AllUsers = () => {

    const [usersInfo, setUsersInfo] = useState([])
    const [areDeleted, setAreDeleted] = useState(false)
    const [deletedUsers, setDeletedUsers] = useState([])
    const user = useSelector(usersData)
    const token = user?.credentials?.token
    const navigate = useNavigate()

    const fetchAllUsers = () => {
        getAllUsers(token)
            .then((res) => {
                setUsersInfo(res.data);
                console.log(res.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchDeletedUsers = () => {
        getDeletedUsers(token)
        .then((res) => {
            setDeletedUsers(res.data);
        })
        .catch((error) => console.log(error))
    }

    useEffect(() => {
        fetchDeletedUsers()
    }, [areDeleted])

    const handleDelete = (id) => {
        deleteProfileAsAdmin(id, token)
            .then(() => fetchAllUsers())
            .catch((error) => console.log(error))
    }

    const handleRestore = (id) => {
        restoreProfile(id, token)
            .then(() => fetchDeletedUsers())
            .catch((error) => console.log(error))
    }

    return (
        <div className="allUsersDesign">
            <Container className="allUsersContainer">
                {usersInfo.length > 0
                    ? (areDeleted
                            ? (<>
                                <Row className="d-flex justify-content-center justify-content-md-end mt-4 my-md-4">
                                    <Col xs={8} md={3}>
                                        <CustomButton name="Back to users" onClick={() => setAreDeleted(false)}></CustomButton >
                                    </Col>
                                </Row>
                                {deletedUsers.map((user) => {
                                    return (
                                        <div className="eachUser deleted" key={user.id}>
                                            <Row>
                                                <Col sm={10} md={1}>
                                                    <div className="text-center mb-1">Id: {user.id}</div>
                                                </Col>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">Deleted at</div>
                                                </Col>
                                                <Col sm={10} md={4}>
                                                    <div className="userInfo">{user.deleted_at}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">Email</div>
                                                </Col>
                                                <Col sm={10} md={10}>
                                                    <div className="userInfo">{user.email}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">Name</div>
                                                </Col>
                                                <Col sm={10} md={4}>
                                                    <div className="userInfo">{user.name}</div>
                                                </Col>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">Surname</div>
                                                </Col>
                                                <Col sm={10} md={4}>
                                                    <div className="userInfo">{user.surname}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">City</div>
                                                </Col>
                                                <Col sm={10} md={4}>
                                                    <div className="userInfo">{user.city}</div>
                                                </Col>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">Country</div>
                                                </Col>
                                                <Col sm={10} md={4}>
                                                    <div className="userInfo">{user.country}</div>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-center justify-content-md-end mt-2 me-md-2">
                                                <Col xs={5} md={2}>
                                                    <CustomButton name="Restore" onClick={() => handleRestore(user.id)}></CustomButton >
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })}
                            </>)
                            : (<>
                                <Row className="d-flex justify-content-center justify-content-md-end mt-4 my-md-4">
                                    <Col xs={8} md={3} className="mb-3">
                                        <CustomButton name="Deleted users" onClick={() => setAreDeleted(true)}></CustomButton >
                                    </Col>
                                    <Col xs={8} md={3}>
                                        <CustomButton name="Back to menu" onClick={() => navigate('/admin')}></CustomButton >
                                    </Col>
                                </Row>
                                {usersInfo.map((user) => {
                                    return (
                                        <div className="eachUser" key={user.id}>
                                            <Row>
                                                <Col sm={10} md={1}>
                                                    <div className="text-center mb-1">Id: {user.id}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">Email</div>
                                                </Col>
                                                <Col sm={10} md={10}>
                                                    <div className="userInfo">{user.email}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">Name</div>
                                                </Col>
                                                <Col sm={10} md={4}>
                                                    <div className="userInfo">{user.name}</div>
                                                </Col>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">Surname</div>
                                                </Col>
                                                <Col sm={10} md={4}>
                                                    <div className="userInfo">{user.surname}</div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">City</div>
                                                </Col>
                                                <Col sm={10} md={4}>
                                                    <div className="userInfo">{user.city}</div>
                                                </Col>
                                                <Col sm={10} md={2}>
                                                    <div className="userLabel">Country</div>
                                                </Col>
                                                <Col sm={10} md={4}>
                                                    <div className="userInfo">{user.country}</div>
                                                </Col>
                                            </Row>
                                            <Row className="d-flex justify-content-center justify-content-md-end mt-2 me-md-2">
                                                <Col xs={5} md={2}>
                                                    <CustomButton name="Delete" onClick={() => handleDelete(user.id)}></CustomButton >
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                })}
                            </>)
                    )
                    : (
                        <div>Loading...</div>
                    )
                }
            </Container>
        </div>
    )
}