import React from "react";
import './Register.css';
import { InputText } from "../../common/InputText/InputText";

export const Register = () => {

    return(
        <div className='registerDesign'>
            <InputText
                label={"hola"}
                name={"name"}
                placeholder={"Introduce tu nombre"}
            ></InputText>
        </div>
    )
}