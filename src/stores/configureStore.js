import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { multiClientMiddleware } from "redux-axios-middleware";
import createFilter from "@actra-development-oss/redux-persist-transform-filter-immutable"
import { AsyncStorage } from "react-native";
import thunkMiddleware from "redux-thunk";
import { name as appName } from "../../app.json";
import clients from "./clients";
import rootReducer from "../reducers";

const authFilter = createFilter('auth', ['token'])

const persistConfig = {
  key: "root",
  blacklist: [],
  transforms: [authFilter],
  whitelist: ["auth"],
  keyPrefix: appName,
  storage: AsyncStorage
};
const middlewares = [
  thunkMiddleware,
  multiClientMiddleware(clients),
];
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(...middlewares),
  ));
  let persistor = persistStore(store);
  return { store, persistor };
};
