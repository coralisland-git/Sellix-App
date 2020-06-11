import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as modalReducer } from "redux-modal";
import authReducers from "./auth";
import dashboardReducer from "./dashboard"
import commonReducer from "./common"
import invoiceReducer from "./invoice"

export default combineReducers({
  form: formReducer,
  dashboard: dashboardReducer,
  modal: modalReducer,
  auth: authReducers,
  common: commonReducer,
  order: invoiceReducer
});
