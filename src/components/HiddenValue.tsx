import { View, Text } from "react-native"
import  Icon  from "react-native-vector-icons/Entypo"

interface HiddenValueProps{ 
    visible: boolean,
    value: string,
    type: string,

 }

const HiddenValue :React.FC<HiddenValueProps> = (item)=> {
    return(
        <View>
            {!item.visible?
            <View style={{flexDirection:'row', margin:10}}>
                <Text>****</Text>
                <Icon style={{marginLeft:10,marginTop:3}} name='eye-with-line'/>

            </View>
                :
                <>
                    {
                        item.type=='debit'?
                            <Text style={{marginTop:10 , color:'#008ECC',fontSize:20 }}>+RM{item.value}</Text>
                            :
                            <Text style={{marginTop:10,color:'red',fontSize:20}}>-RM{item.value}</Text>
                    }
                </>
                
            }
        </View>
    )
}

export {HiddenValue}