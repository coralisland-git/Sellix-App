export type Action =
  { type: "PUSH_NEW_ROUTE", route: string }
  | { type: "POP_ROUTE" }
  | { type: "POP_TO_ROUTE", route: string }
  | { type: "REPLACE_ROUTE", route: string }
  | { type: "REPLACE_OR_PUSH_ROUTE", route: string }
  | { type: "OPEN_DRAWER"}
  | { type: "CLOSE_DRAWER"}
  | { type: "SET_USER", name: string}
  | { type: "SET_LIST", list: string}

export type Dispatch = (action:Action | Array<Action>) => any;
export type GetState = () => Object;
export type PromiseAction = Promise<Action>;

export const OPEN_DRAWER = "OPEN_DRAWER";
export const CLOSE_DRAWER = "CLOSE_DRAWER";

/* Auth */
export const USER_AUTH_REQUESTED = "USER_AUTH_REQUESTED";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_AUTH_FAILED = "USER_AUTH_FAILED";

/* Settings */
export const USER_PROFILE = "USER_PROFILE"
export const USER_SETTINGS = "USER_SETTINGS"
export const USER_LOGOUT_REQUESTED = "USER_LOGOUT_REQUESTED";


export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILED = "FETCH_DATA_FAILED";



export const UPDATE_DATA_START = "UPDATE_DATA_START";
export const UPDATE_DATA_SUCCESS = "UPDATE_DATA_SUCCESS";
export const UPDATE_DATA_FAILED = "UPDATE_DATA_FAILED";


/* Dashboard Chart */
export const DASHBOARD_TOTAL_DATA = "DASHBOARD_TOTAL_DATA";
export const DASHBOARD_GRAPH_DATA = "DASHBOARD_GRAPH_DATA";


/* Orders */
export const INVOICES = "INVOICES";


export const USER_SCAN_REQUESTED = "USER_SCAN_REQUESTED";
export const USER_SCAN_SUCCESS = "USER_SCAN_SUCCESS";
export const USER_SCAN_FAILED = "USER_SCAN_FAILED";

export const SCAN_HISTORY_REQUESTED = "SCAN_HISTORY_REQUESTED";
export const SCAN_HISTORY_SUCCESS = "SCAN_HISTORY_SUCCESS";
export const SCAN_HISTORY_FAILED = "SCAN_HISTORY_FAILED";

export const SWITCH_ENVIRONMENT = "SWITCH_ENVIRONMENT";
export const SWITCH_BUNDLE = "SWITCH_BUNDLE";
