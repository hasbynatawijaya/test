import {
  GET_CONTACTS,
  DELETE_CONTACT,
  ADD_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT,
} from "./types";
import axios from "axios";
import { asyncActionError, asyncActionStart, asyncActionFinish } from "./asyncActions";


const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const getContacts = () => async dispatch => {
  try {
    dispatch(asyncActionStart())
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    dispatch({
      type: GET_CONTACTS,
      payload: res.data
    });
    dispatch(asyncActionFinish())
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError())
  }
};

export const getContact = id => async dispatch => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  dispatch({
    type: GET_CONTACT,
    payload: res.data
  });
};

export const deleteContact = id => async dispatch => {
  try {
    dispatch(asyncActionStart())
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
    dispatch(asyncActionFinish())
  } catch (e) {
    dispatch({
      type: DELETE_CONTACT,
      payload: id
    });
    dispatch(asyncActionError())
  }
};

export const addContact = contact => async dispatch => {
  const res = await axios.post(
    "https://jsonplaceholder.typicode.com/users",
    contact
  );
  dispatch({
    type: ADD_CONTACT,
    payload: res.data
  });
};

export const updateContact = contact => async dispatch => {
  const res = await axios.put(
    `https://jsonplaceholder.typicode.com/users/${contact.id}`,
    contact
  );
  dispatch({
    type: UPDATE_CONTACT,
    payload: res.data
  });
};
