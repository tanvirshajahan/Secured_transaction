import { Dispatch } from "react";


export interface UpdateVisibleAction {
    readonly type: "ON_UPDATE_VISIBLE";
    payload: boolean;
}

export type UserAction = UpdateVisibleAction;

export const onUpdateVisible = (visible:boolean) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: "ON_UPDATE_VISIBLE",
            payload: visible,
        });
    }
}


