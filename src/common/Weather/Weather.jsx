import React, { useEffect, useState } from 'react'
import './Weather.css'
import { Col, Container, Row } from 'react-bootstrap'
import { getCity, getWeather } from '../../services/apiCalls'
import pin from "../../assets/weatherIcons/pin.png"
import { weatherIcon } from '../../services/weather'
import { useSelector } from 'react-redux'
import { usersData } from '../../pages/userSlice'

export const Weather = () => {

    const [coordinates, setCoordinates] = useState("")
    const [temp, setTemp] = useState({})
    const [description, setDescription] = useState([])
    const [icon, setIcon] = useState(null)
    const data = useSelector(usersData)
    const city = data.data.city

    useEffect(() => {
        getCity(city)
            .then((res) => {
                setCoordinates(res[0])
            })
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        const latValue = coordinates.lat
        const lonValue = coordinates.lon

        getWeather(latValue, lonValue)
            .then((res) => {
                setTemp(res.main)
                setDescription(res.weather)
                setIcon(weatherIcon(resultIcon));
            })
            .catch((error) => console.log(error))

    }, [coordinates])

    let resultTemp = `${Math.trunc(temp.temp)}°C`
    let resultDesc = description[0]?.description
    let resultIcon = description[0]?.icon

    return (

        <div className="weatherContainer">
            <div className="city">
                <img src={pin} className="pin" />
                <div>{coordinates.name}</div>
            </div>
            <div className="d-flex">
                <div className="weatherCol">
                    <div className="temp">{resultTemp} </div>
                    <div className="weatherDescrip">{resultDesc}</div>
                </div>
                <div className="weatherCol">{icon}</div>
            </div>
        </div >
    )
}

