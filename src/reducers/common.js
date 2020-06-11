import * as ACTION_TYPES from "../constants/action-types";

const initialState = {
  fetching: false,
  updating: false,
  message: "",
  error: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.FETCH_DATA_START:
      return {
        fetching: true,
        updating: false,
        message: '',
        error: false
      };
    case ACTION_TYPES.FETCH_DATA_SUCCESS:
      return {
        fetching: false,
        updating: false,
        error: false,
        message: payload
      };
    case ACTION_TYPES.FETCH_DATA_FAILED:
      return {
        fetching: false,
        updating: false,
        error: true,
        message: payload
      };

    case ACTION_TYPES.UPDATE_DATA_START:
      return {
        ...state,
        updating: true
      };
    case ACTION_TYPES.UPDATE_DATA_SUCCESS:
      return {
        ...state,
        updating: false,
        error: false,
        message: payload
      };
    case ACTION_TYPES.UPDATE_DATA_FAILED:
      return {
        ...state,
        updating: false,
        error: true,
        message: payload
      };
    default:
      return state;
  }
};
