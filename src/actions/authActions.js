import axios from "axios";
import jwtDecode from "jwt-decode";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

const BASE_URL = "https://dev.gadjian.com";

export const setAuthorizationToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem("jwtToken");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  };
};

export const login = data => {
  return dispatch => {
    return axios.post(`${BASE_URL}/oauth/token`, data).then(res => {
      const token = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  };
};

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
