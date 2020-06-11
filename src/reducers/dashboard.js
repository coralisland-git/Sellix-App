import * as ACTION_TYPES from "../constants/action-types";

const initialState = {
  total: {},
  gdata: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.DASHBOARD_TOTAL_DATA:
      return {
        ...state,
        total: payload.data.analytics.total || {}
      };

    case ACTION_TYPES.DASHBOARD_GRAPH_DATA:
      return {
        ...state,
        gdata: payload.data.analytics
      };
    default:
      return state;
  }
};
