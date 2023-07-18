import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Register } from "../Register/Register";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";

export const Body = () => {
    return (
        <>
            <Routes>
                <Route path='*' element={<Navigate to='/' />} />
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
    )
}