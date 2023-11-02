import { Dimensions, TouchableOpacity, View,Text, StyleSheet } from "react-native";
import { TransactionDetails, UserState } from "../redux/models";
import { useNavigation } from "../utils";
import { HiddenValue } from "./HiddenValue";
import { ApplicationState } from "../redux";
import { connect } from "react-redux";
const {width } = Dimensions.get('window');

interface TransactionListProps{ 
    item: TransactionDetails[],
    UserReducer: UserState,

 }

const _ListContent: React.FC<TransactionListProps> = (value: any)=>{
    const { navigate } = useNavigation()
    let {name,time,currency,type,date,description} = value.item;
return(
    <TouchableOpacity onPress={()=> 
        {
            navigate('transactionDetails', { details: value.item})
        }
    }>
        <View style={[styles.cards,{ backgroundColor: '#fff'}]}>
            
            <View style={{ flex: 1,flexDirection: 'row',alignItems:'center',justifyContent: 'space-evenly' ,marginBottom:10, }}>
                <View style={{ flex: 2,flexDirection: 'column',justifyContent: 'space-evenly', marginLeft:27}}>
                    <Text style={{marginBottom:10,fontSize:20}}>{name}</Text>
                    <Text >{'account:'+description}</Text>
                </View>  
                <View style={{ flex: 1,flexDirection: 'column',justifyContent: 'space-evenly',marginHorizontal:10,borderLeftWidth:2, borderColor: '#fff'}}>
                    <HiddenValue visible={value.UserReducer.visible} value={currency} type={type} />
                    <Text style={{marginBottom:10,fontSize:10}}>{date+'\n'+ time}</Text>
                </View>
            </View>  
        </View>
    </TouchableOpacity>)}

    const styles = StyleSheet.create({
        cards: {
            width: width - 30,
            
            marginBottom: 20, 
            alignSelf:'center', 
            // borderWidth: 2, 
            borderRadius:Math.round(6)
        },
    })

    const mapToStateProps =(state:ApplicationState) =>({
        UserReducer: state.UserReducer
    })
    
    const ListContent = connect(mapToStateProps)(_ListContent)
    
    export {ListContent}