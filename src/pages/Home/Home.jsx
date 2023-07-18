import React from "react";
import './Home.css'
import { InputText } from "../../common/InputText/InputText";
import { CustomCard } from "../../common/CustomCard/CustomCard";


export const Home = () => {



    return (
        <div className="homeDesign">
            <div className="homeGreen">
                <div className="homePhoto"></div>
            </div>
            <div className="homeSearch">
                <h1 className="searchLetters">Search for your favourite plant</h1>
                <InputText
                    name="plant"
                    placeholder="Enter plant name">
                </InputText>
            </div>
            <div className="homeCards">
                <CustomCard></CustomCard>
                <CustomCard></CustomCard>
        </div>
        </div >
    )
}