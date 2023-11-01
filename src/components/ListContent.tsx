import { Dimensions, TouchableOpacity, View,Text, StyleSheet } from "react-native";
import { TransactionDetails } from "../redux/models";
import { useNavigation } from "../utils";
const {width } = Dimensions.get('window');

interface TransactionListProps{ 
    item: TransactionDetails[],

 }

const ListContent: React.FC<TransactionListProps> = (item: any)=>{
    console.log('12az', item)
    const { navigate } = useNavigation()
    let {name,time,currency,type,date,description} = item;

return(
    <TouchableOpacity onPress={()=> 
        {
            // storage.setItem('DetailedInfo',JSON.stringify(item));
            // goToScreen(item.props,'Service History Details');
            navigate('transactionDetails');

            // item.props.navigate('Transaction Details', {
            //     value: item.props,
            //   });
        }
    }>
        <View style={[styles.cards,{ backgroundColor: '#fff'}]}>
            
            <View style={{ flex: 1,flexDirection: 'row',alignItems:'center',justifyContent: 'space-evenly' ,marginBottom:10, }}>
                <View style={{ flex: 2,flexDirection: 'column',justifyContent: 'space-evenly', marginLeft:27}}>
                    {/* <Text  style={{flex:2,}}>{name == 'Rejected'? 'Unsuccessful': statusName}</Text> */}
                    <Text >{name}</Text>
                    <Text >{description}</Text>

                    <Text  >{date}</Text>
                </View>  
                <View style={{ flex: 1,flexDirection: 'column',justifyContent: 'space-evenly',marginHorizontal:10,borderLeftWidth:2, borderColor: '#fff'}}>
                {type=='debit'?
                    <Text style={{marginTop:10 ,color:'blue'}}>+RM{currency}</Text>
                    :
                    <Text style={{marginTop:10,color:'red'}}>-RM{currency}</Text>
                }
                    <Text style={{marginBottom:10,fontSize:10}}>{time}</Text>
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

    export {ListContent};