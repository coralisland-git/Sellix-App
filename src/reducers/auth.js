import * as ACTION_TYPES from "../constants/action-types";

const initialState = {
  token: undefined,
  isAuthenticating: false,
  error: undefined,
  isFailed: false,
  profile: null,
  settings: null
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ACTION_TYPES.USER_AUTH_REQUESTED:
      return {
        ...state,
        isAuthenticating: true,
        isFailed: false
      };
    case ACTION_TYPES.USER_LOGIN_SUCCESS:
      return {
        token: payload.data.token,
        isAuthenticating: false,
        isFailed: false
      };
    case ACTION_TYPES.USER_PROFILE:
      return {
        ...state,
        profile: payload
      };
    case ACTION_TYPES.USER_SETTINGS:
      return {
        ...state,
        settings: payload
      };
    case ACTION_TYPES.USER_SIGNUP_SUCCESS:
      return {
        isFailed: false,
        isAuthenticating: false,
      };
    case ACTION_TYPES.USER_AUTH_FAILED:
      return {
        error: error,
        isAuthenticating: false,
        isFailed: true
      };
    case ACTION_TYPES.USER_LOGOUT_REQUESTED:
      return {
        ...initialState
      };
    default:
      return state;
  }
};
