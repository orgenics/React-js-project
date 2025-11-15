import { combineReducers } from "redux";
import { authReducer } from "./authreducer";
import { productReducer } from "./propertyReducer";

export const rootReducer = combineReducers({
    productReducer,
    authReducer
})