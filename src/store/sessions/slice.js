import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
  name: "sessions",
  initialState: {
    sessionsList: null,
    _cid: "",
    meeting: null
  },
  reducers: {
    setSessions: (state, action) => {
      return {
        ...state,
        sessionsList: action.payload
      };
    },

    setCancel: (state, action) => {
      return {
        ...state,
        sessionsList: action.payload
      };
    },

    setMeeting: (state, action) => {
      return {
        ...state,
        meeting: action.payload
      };
    }
  },
});
