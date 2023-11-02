import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Loading from '../utils/Loader';
import {onFaceId} from '../utils/Authentication'
import { ApplicationState, TransactionDetails, UserState, onUpdateVisible } from '../redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '../utils';
const {width } = Dimensions.get('window');

interface TransactionDetailsProps{
    UserReducer: UserState,
    navigation: { getParam: Function, goBack: Function}

}

const _DetailScreen: React.FC<TransactionDetailsProps> = (props) => {
    const { getParam, goBack } = props.navigation;
    const [isUnlocked, setIsUnlocked] = useState(false);
    const details = getParam('details') as TransactionDetails

    const {visible} =props.UserReducer

    async function checking(){
        if (!visible){
            const res = await onFaceId();
            if(res){
                setIsUnlocked(true)
                onUpdateVisible(true)
            }else{
                setIsUnlocked(false)
            }
        }else{
            setIsUnlocked(true)
        }
    }
       
    useEffect(() => {
        checking()
    }, [])

    return(
        <View style={{flex:1}}>
            {!isUnlocked?<Loading loading="true"/>
            :
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Icon  size={30}style={styles.closeBtn} name='chevron-left' onPress={()=>
                    {
                          goBack()

                    }} />
                    <Text style={{textAlign: 'center',fontSize:20, flex:10,}}> Transaction Details</Text>
                </View>
                <View style={styles.body}>
                    {details.type=='debit'?
                        <Text style={styles.amountDebit}>+RM{details.currency}</Text>
                    :
                        <Text style={styles.amount}>-RM{details.currency}</Text>
                    }
                    <View style={styles.divider}/> 
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemLabel}>Description</Text>
                        <Text style={styles.itemvalue} >{details.description}</Text>
                    </View>

                    <View style={styles.divider}/> 
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemLabel}>Transaction Type</Text>
                        <Text style={styles.itemvalue} >{details.type}</Text>
                    </View>

                    <View style={styles.divider}/> 
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemLabel}>Description</Text>
                        <Text style={styles.itemvalue} >{details.description}</Text>
                    </View>

                    <View style={styles.divider}/> 
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemLabel}>Date / Time</Text>
                        <Text style={styles.itemvalue} >{details.date} {details.time}</Text>
                    </View>
                    
                    <View style={styles.divider}/> 
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemLabel}>Account</Text>
                        <Text style={styles.itemvalue} >{details.name}</Text>
                    </View>
                </View>
            </View>
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    navigation:{
        flex :2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    body:{
        flex :9,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
    textTitle: {
        fontSize:26,
    }, 
    closeBtn: {
        justifyContent:'flex-start',
        flex:1
    },
    divider: {
        width: width-20,
        height: 1,
        marginLeft:10,
        justifyContent: 'center',
        backgroundColor: '#DFE4EA'
        
    },
    itemDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin:20,
    },
    itemLabel: {
       color: '#808080',
       textTransform:'capitalize'
    },
    itemvalue: {
       textTransform:'capitalize'
    },
    amountDebit: {
       color: 'blue',
       fontSize:26,
       marginLeft:20,
       marginVertical:20
    },
    amount: {
       color: 'red',
       fontSize:26,
       marginLeft:20,
       marginVertical:20
    }
})

const mapToStateProps =(state:ApplicationState) =>({
    UserReducer: state.UserReducer
})

const DetailScreen = connect(mapToStateProps,{onUpdateVisible})(_DetailScreen)

export {DetailScreen}
