
import { UserAction } from '../actions/index'
import { UserState } from '../models'

const initialState ={ 
    visible : {} as boolean
}

const TransactionReducer =(state: UserState = initialState, action: UserAction) =>{

    if(action.type == "ON_UPDATE_VISIBLE"){
        return{
            ...state,
            visible: action.payload
        }
    }else{
        return(state)
    }
}

export {TransactionReducer}