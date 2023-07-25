import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { MyPlants } from "../MyPlants/MyPlants";
import { DetailPlant } from "../DetailPlant/DetailPlant";
import { AdminProfile } from "../AdminProfile/AdminProfile";
import { AllUsers } from "../AllUsers/AllUsers";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path='*' element={<Navigate to='/' />} />
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/myplants' element={<MyPlants />} />
                <Route path='/detail' element={<DetailPlant />} />
                <Route path='/admin' element={<AdminProfile />} />
                <Route path='/allusers' element={<AllUsers />} />
            </Routes>
        </>
    )
}