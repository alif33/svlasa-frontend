import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user/slice';
import { sessionSlice } from './sessions/slice';


export const rootReducer = combineReducers({
    user: userSlice.reducer,
    sessions: sessionSlice.reducer,
})