import axios from "axios";
//import jwtDecode from "jwt-decode";

export const SET_CURRENT_USER = "SET_CURRENT_USER";

//const BASE_URL = "https://dev.gadjian.com";

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
    return axios
      .post("/oauth/token", data, {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        withCredentials: true,
        credentials: "same-origin"
      })
      .then(res => {
        const token = res.data;
        localStorage.setItem("jwtToken", token.token);
        setAuthorizationToken(token.token);
        dispatch(setCurrentUser(token));
        console.log(token);
      })
      .catch(err => {
        console.log("error: " + err);
      });
  };
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    user,
  };
};
