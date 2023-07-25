import React, { useEffect, useState } from "react"
import './AllUsers.css'
import { Col, Row, Container } from "react-bootstrap";
import { deleteProfileAsAdmin, getAllUsers } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { usersData } from "../userSlice";
import { CustomButton } from "../../common/CustomButton/CustomButton";

export const AllUsers = () => {

    const [usersInfo, setUsersInfo] = useState([])
    const user = useSelector(usersData)
    const token = user?.credentials?.token

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


    return (
        <div className="allUsersDesign">

            <Container className="allUsersContainer">
                {usersInfo.length > 0
                    ? (
                        usersInfo.map((user) => {
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
                                </div>
                            )
                        })
                    )
                    : (
                        <div>Loading...</div>
                    )
                }
            </Container>
        </div>
    )
}