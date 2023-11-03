
import { TransactionAction } from '../actions/TransactionAction'
import { TransactionDetails } from '../models'

const initialState = { 
    
    data: {} as [TransactionDetails],

}

const TransactionReducer =(state = initialState, action: TransactionAction) =>{
    if(action.type == "ON_ADD_DATA"){

        return{
            ...state,
            data: [...state.data, action.payload]
        }
    }else{
        return(state)
    }
}

export {TransactionReducer}