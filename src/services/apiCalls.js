import axios from "axios";

const URL = "http://localhost:8000/api";

export const registerUser = async (userInfo) => {
    let res = await axios.post(`${URL}/register`, userInfo)
    return res.data
}