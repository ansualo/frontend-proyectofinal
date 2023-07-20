import React from "react";
import { useSelector } from "react-redux";
import { usersData } from "../userSlice";

export const Profile = () => {

    const datos = useSelector(usersData)

    console.log(datos)

    return (
        <div></div>
    )
}