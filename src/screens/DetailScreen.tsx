import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import Loading from '../utils/Loader';
import {onFaceId} from '../utils/Authentication'
import { ApplicationState, UserState } from '../redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '../utils';
const {width } = Dimensions.get('window');

interface TransactionDetailsProps{
    UserReducer: UserState,
    navigation: { getParam: Function, goBack: Function}

}

const _DetailScreen: React.FC<TransactionDetailsProps> = (props) => {
    const { navigate } = useNavigation();

    const {visible} =props.UserReducer
    if (!visible) 
        // onFaceId();

    return(
        <View style={{flex:1}}>
            {false?<Loading loading="true"/>
            :
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Icon  size={30}style={styles.closeBtn} name='chevron-left' onPress={()=>
                    {
                          props.navigation.goBack()

                    }} />
                    <Text style={{textAlign: 'center',fontSize:20, flex:10,}}> Transaction Details</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.divider}/>
                    {/* <View style={{height:200,backgroundColor }}/> */}
                    <Text>asd</Text>
                    
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
        // justifyContent:'center',
        // alignItems: 'center'
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
        width: width-50,
        height: 1,
        
        backgroundColor: '#000'
        // backgroundColor: '#DFE4EA'
        
    }
})

const mapToStateProps =(state:ApplicationState) =>({
    UserReducer: state.UserReducer
})

const DetailScreen = connect(mapToStateProps)(_DetailScreen)

export {DetailScreen}
