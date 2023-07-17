import React from "react";
import './InputText.css';
import { Form } from "react-bootstrap";

export const InputText = ({ label, name, type = 'text', placeholder, maxLength = 50 }) => {

    return (
        <Form.Group>
            <Form.Label className="labelDesign" >{label}</Form.Label>
            <Form.Control
                className="inputDesign"
                name={name}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
            />
        </Form.Group>
    )
}