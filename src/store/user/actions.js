import { userSlice } from "./slice";
import Cookies from 'universal-cookie';
const { actions: slice } = userSlice;
const cookies = new Cookies();

export const logedIn = u => (dispatch) => {
    cookies.set("__t__", JSON.stringify({
       token: u.token
    }), { path: '/' });
    dispatch(slice.logedIn(u))
}

export const logOut = () => (dispatch) => {
    dispatch(slice.logOut())
}