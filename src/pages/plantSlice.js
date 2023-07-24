import { createSlice} from "@reduxjs/toolkit";

export const plantSlice = createSlice({
    name: "plant",
    initialState: {
        data: {}
    },
    reducers: {
        savePlant: (state, action) => {
            let { payload } = action;
            state.data = payload.data;
        },
    },
});

export const plantsData = (state) => state.myplant;
export const { savePlant } = plantSlice.actions;
export default plantSlice.reducer;