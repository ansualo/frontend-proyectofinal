import axios from "axios";

// const URL = "http://localhost:8000/api";

const URL = "https://backend-proyectofinal.vercel.app/api/api"

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

    const body = { "watering": selectedWatering }
    let res = await axios.post(`${URL}/plants/watering`, body)
    return res.data
}

export const getPlantBySunlight = async (selectedSunlight) => {

    const body = { "sunlight": selectedSunlight }
    let res = await axios.post(`${URL}/plants/sunlight`, body)
    return res.data
}

export const getPlantByFlowers = async (selectedFlowers) => {

    const body = { "flowers": selectedFlowers }
    let res = await axios.post(`${URL}/plants/flowers`, body)
    return res.data
}

export const getPlantByPoisonous = async (selectedPoisonous) => {

    const body = { "poisonous": selectedPoisonous }
    let res = await axios.post(`${URL}/plants/poisonous`, body)
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

//DETAIL PLANT

export const createMyPlant = async (id, newData, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.post(`${URL}/myplants/${id}`, newData, config)
    return res.data
}

export const updateMyPlant = async (id, newData, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.put(`${URL}/myplants/${id}`, newData, config)
    return res.data
}

export const deleteMyPlant = async (id, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.delete(`${URL}/myplants/${id}`, config)
    return res.data
}

export const createWateringDate = async (waterData, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.post(`${URL}/water`, waterData, config)
    return res.data
}

export const deleteWateringDate = async (id, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.delete(`${URL}/water/${id}`, config)
    return res.data
}


//ALL USERS

export const getAllUsers = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.get(`${URL}/allusers`, config)
    return res.data
}

export const getDeletedUsers = async (token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.get(`${URL}/allusers/deleted`, config)
    return res.data
}

export const deleteProfileAsAdmin = async (id, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.delete(`${URL}/profile/${id}`, config)
    return res
}

export const restoreProfile = async (id, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.put(`${URL}/profile/${id}`, null, config)
    return res
}

//PLANTS SETTINGS

export const createPlant = async (newPlant, token) => {
    let config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    let res = await axios.post(`${URL}/plants`, newPlant, config)
    return res.data
}


//WEATHER APP

export const getCity = async (city) => {

    let res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=59811b2c2443aacedf1ccc7bb01cf180`)
    return res.data
}


export const getWeather = async (latValue, lonValue) => {

    let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${lonValue}&units=metric&appid=59811b2c2443aacedf1ccc7bb01cf180`)
    return res.data
}
