import React from "react";
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/images/logo.png'


export const Header = () => {

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
                        <Nav.Link href="#home">Login</Nav.Link>
                        {/* <Nav.Link href="#link">Link</Nav.Link>
                        <Nav.Link href="#link">Hola</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
