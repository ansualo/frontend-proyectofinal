import { createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        credentials: {
            token: "",
        },
        data: {
            name: "",
            surname: "",
            city: "",
            country:"",
            email:"",
            role_id: "",
        },
    },
    reducers: {
        loginReducer: (state, action) => {
            let { payload } = action;
            state.credentials = {
                token: payload.token,
            };
            state.data = {
                name: payload.data.name,
                surname: payload.data.surname,
                city: payload.data.city,
                country: payload.data.country,
                role_id: payload.data.role_id,
            };
        },
        logoutReducer: (state) => {
            state.credentials = {
                token: "",
            };
            state.data = {
                name: "",
                surname: "",
                city: "",
                country: "",
                role_id: "",
            };
        },
    },
});

export const usersData = (state) => state.user;
export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;