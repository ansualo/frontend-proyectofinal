import React from 'react';
import './CustomModal.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const CustomModal = ({ handleDelete }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="danger" onClick={handleShow} className="buttonDesign redBackground">
                Delete
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className="text-center">
                        Hold up! Want to delete your account? Just making sure
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="primary px-5" onClick={handleClose}>
                        No way
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete()}>
                        Yep, I'm sure
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}