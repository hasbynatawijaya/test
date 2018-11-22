import { combineReducers } from "redux";
import contactReducer from "./contactReducer";
import asyncReducer from "./asyncReducer";
import authReducer from "./authReducer";

export default combineReducers({
  contact: contactReducer,
  async: asyncReducer,
  auth: authReducer
});
