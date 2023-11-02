import { Dispatch } from "react";


export interface UpdateVisibleAction {
    readonly type: "ON_UPDATE_VISIBLE";
    payload: boolean;
}

export type UserAction = UpdateVisibleAction;

export const onUpdateVisible = (visible:boolean) => {
    console.log('action0')

    return async (dispatch: Dispatch<UserAction>) => {
        console.log('action1')
        dispatch({
            type: "ON_UPDATE_VISIBLE",
            payload: visible,
        });
    }
}


