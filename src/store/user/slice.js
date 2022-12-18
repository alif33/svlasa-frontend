import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        __u__: {},
        isUser: false,
    },
    reducers: {

        logedIn: (state, action) => {
            return {
                ...state,
                isUser: true,
                __u__: action.payload
            }
 
        },

        logOut: (state, action) => {
            return {
                ...state,
                isUser: false,
                __u__: {}
            }
        }
    }
})