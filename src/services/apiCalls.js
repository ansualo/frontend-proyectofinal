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

export const getPlantById = async (plant_id) => {
    let res = await axios.get(`${URL}/plants/${plant_id}`)
    return res.data
}

export const getMyPlantById = async (my_plant_id, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.get(`${URL}/myplants/${my_plant_id}`, config)
    return res.data
}

export const getMyPlantByPlantId = async (plant_id, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.get(`${URL}/myplants/plant/${plant_id}`, config)
    return res.data
}

export const getPlantByName = async (searchedName) => {
    let res = await axios.post(`${URL}/plants/name`, searchedName)
    return res.data
}

export const getPlantByWatering = async (selectedWatering) => {

    const body = {"watering": selectedWatering}
    let res = await axios.post(`${URL}/plants/watering`, body)
    return res.data
}

export const getPlantBySunlight = async (selectedSunlight) => {

    const body = {"sunlight": selectedSunlight}
    let res = await axios.post(`${URL}/plants/sunlight`, body)
    return res.data
}


//PROFILE

export const getProfile = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.get(`${URL}/profile`, config)
    return res.data
}

export const updateProfile = async (newData, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.put(`${URL}/profile`, newData, config)
    return res.data
}

export const deleteProfile = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.delete(`${URL}/profile`, config)
    return res.data
}


//MY PLANTS

export const getPlantsWaterToday = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.get(`${URL}/myplants/watertoday`, config)
    return res.data
}

export const getPlantsNotWaterToday = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.get(`${URL}/myplants/notwatertoday`, config)
    return res.data
}

export const updateWateringDate = async (body, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.put(`${URL}/water`, body, config)
    return res.data
}


