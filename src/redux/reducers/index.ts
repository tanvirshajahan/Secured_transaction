import { combineReducers } from "redux";
import { TransactionReducer } from "./transactionReducer";
import { UserReducer } from "./userReducer";

const rootReducer = combineReducers({
    transactionReducer: TransactionReducer,
    UserReducer: UserReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>

export {rootReducer}