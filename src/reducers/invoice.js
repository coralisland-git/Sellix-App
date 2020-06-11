import * as ACTION_TYPES from "../constants/action-types";

const initialState = {
  invoices: []
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ACTION_TYPES.INVOICES:
      return {
        ...state,
        invoices: payload
      };
    default:
      return state;
  }
};
