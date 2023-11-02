
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
    console.log('reduver')
    if(action.type == "ON_ADD_DATA"){
        console.log('reduver',action)

        return{
            ...state,
            data: action.payload
        }
    }else{
        return(state)
    }
}

export {TransactionReducer}