import { combineReducers } from "redux";
import { transactionReducer } from "./transactionReducer";

const rootReducer = combineReducers({
    transactionReducer: transactionReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>

export {rootReducer}