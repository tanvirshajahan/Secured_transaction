import { Dispatch } from "react";
import { TransactionDetails } from "../models";


export interface AddDataAction {
    readonly type: "ON_ADD_DATA";
    payload: TransactionDetails;
}

export type TransactionAction = AddDataAction;

export const onAddData = (data:TransactionDetails) => {
    return async (dispatch: Dispatch<TransactionAction>) => {
        dispatch({
            type: "ON_ADD_DATA",
            payload: data,
        });
    }
}


