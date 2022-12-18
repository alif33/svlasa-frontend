import { sessionSlice } from "./slice";
const { actions: slice } = sessionSlice;

export const setSessions = ses => (dispatch) => {
    dispatch(slice.setSessions(ses))
}

export const setCancel = _id => (dispatch) => {
    dispatch(slice.setCancel(_id))
}

export const setMeeting = meeting => (dispatch) => {
    dispatch(slice.setMeeting(meeting))
}
