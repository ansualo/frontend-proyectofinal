import axios from "axios";

const URL = "http://localhost:8000/api";

export const registerUser = async (userInfo) => {
    let res = await axios.post(`${URL}/register`, userInfo)
    return res.data
}

export const loginUser = async (userInfo) => {
    let res = await axios.post(`${URL}/login`, userInfo)
    return res.data
}


// HOME

export const getAllPlants = async () => {
    let res = await axios.get(`${URL}/plants`)
    return res.data
}

export const getPlantByWatering = async (selectedWatering) => {

    const body = {"watering": selectedWatering}
    console.log(body)

    let res = await axios.post(`${URL}/plants/watering`, body)
    return res.data
}