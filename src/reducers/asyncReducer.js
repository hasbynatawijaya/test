import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR
} from "../actions/types";

const initialState = {
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ASYNC_ACTION_START:
      return { ...state, loading: true };
    case ASYNC_ACTION_FINISH:
      return { ...state, loading: false };
    case ASYNC_ACTION_ERROR:
      return { ...state, loading: true };
    default:
      return state;
  }
}
