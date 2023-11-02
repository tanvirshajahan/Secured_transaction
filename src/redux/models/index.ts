export interface TransactionDetails{
    // item: [];
    id: string;
    date: string;
    time: string;
    name: string;
    description: string;
    currency: number;
    type: string;
}

export interface UserState{
    visible: boolean;

}