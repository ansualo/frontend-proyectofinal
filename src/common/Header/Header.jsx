import React from "react";
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.png'
import { useDispatch, useSelector } from "react-redux";
import { logoutReducer, usersData } from "../../pages/userSlice";


export const Header = () => {

    const data = useSelector(usersData)
    const token = data?.credentials?.token
    const role = data?.data?.role_id
    const dispatch = useDispatch()

    return (
        <Navbar expand="lg" sticky="top" className="headerDesign">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        className="d-inline-block align-top logo"
                        alt="Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto headerLinks">
                        {token ? (
                            role === 2
                                ? (<>
                                    <Nav.Link href="/" className="me-2">Search</Nav.Link>
                                    <Nav.Link href="/myplants" className="me-2">My plants</Nav.Link>
                                    <Nav.Link href="/" onClick={() => dispatch(logoutReducer())}>Logout</Nav.Link>
                                </>)
                                : (<>
                                    <Nav.Link href="/admin" className="me-2">Settings</Nav.Link>
                                    <Nav.Link href="/" onClick={() => dispatch(logoutReducer())}>Logout</Nav.Link>
                                </>)
                        ) : (
                            <Nav.Link href="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
