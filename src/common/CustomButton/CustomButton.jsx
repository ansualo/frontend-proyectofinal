import React from "react";
import './CustomButton.css'

export const CustomButton = ({className = "buttonDesign", name, onClick}) => {

    return (
        <div className={className} onClick={onClick}>{name}</div>
    )
}