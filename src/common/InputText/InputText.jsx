import React from "react";
import './InputText.css';
import { Form } from "react-bootstrap";

export const InputText = ({ label, name, type = 'text', placeholder, maxLength = 50 }) => {

    return (
        <Form.Group>
            <Form.Label >{label}</Form.Label>
            <Form.Control
                name={name}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
            />
        </Form.Group>
    )
}