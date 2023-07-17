import React from "react";
import './CustomButton.css'

export const CustomButton = ({name, onClick}) => {

    return (
        <div className="buttonDesign" onClick={onClick}>{name}</div>
    )
}