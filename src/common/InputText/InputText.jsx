import React from "react";
import './InputText.css';
import { Form } from "react-bootstrap";
import { checkError } from "../../services/useful";

export const InputText = ({ label, name, type = 'text', placeholder, maxLength = 50, state, errorState }) => {

    const inputHandler = (e, state) => {
        state((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const inputCheck = (e, errorState) => {
        let messageError = checkError(e.target.name, e.target.value);

        errorState((prevState) => ({
            ...prevState,
            [e.target.name + 'Error']: messageError
        }))
    }

    return (
        <Form.Group>
            <Form.Label className="labelDesign" >{label}</Form.Label>
            <Form.Control
                className="inputDesign"
                name={name}
                type={type}
                placeholder={placeholder}
                maxLength={maxLength}
                onChange={(e) => inputHandler(e, state)}
                onBlur={(e) => inputCheck(e, errorState)}
            />
        </Form.Group>
    )
}