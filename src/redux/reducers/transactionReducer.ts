
import { TransactionAction } from '../actions/TransactionAction'
import { TransactionDetails } from '../models'

const initialState = { 
    id: '' as string,
    date: '' as string,
    time: '' as string,
    name: '' as string,
    description: '' as string,
    currency: '' as string,
    type: '' as string

}

const TransactionReducer =(state: TransactionDetails = initialState, action: TransactionAction) =>{
    if(action.type == "ON_ADD_DATA"){

        return{
            ...state,
            data: action.payload
        }
    }else{
        return(state)
    }
}

export {TransactionReducer}