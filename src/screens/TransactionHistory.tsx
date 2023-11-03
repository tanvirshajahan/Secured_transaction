import React, { useEffect, useState } from 'react'
import {View, FlatList, Text, StyleSheet,Dimensions, TouchableOpacity, Switch, Modal, Pressable, Alert, ScrollView, TextInput} from 'react-native'
import Loading from '../utils/Loader';
import { onFaceId } from '../utils';
import { ListContent } from '../components/ListContent';
import Icon from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { UserState,onUpdateVisible, ApplicationState, TransactionDetails, store} from '../redux';
import moment from 'moment';
import { AddModal } from '../components/AddModals';
import {storeData, getData} from '../utils'

const {width } = Dimensions.get('window');
interface TransactionHistoryProps{
    UserReducer: UserState,
    onUpdateVisible: Function
}

const _TransactionHistory: React.FC<TransactionHistoryProps> = (props) => {

    const { onUpdateVisible }= props
    
    const [isEnabled, setIsEnabled] = useState(false);
    const [sort, setSort] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checker, setChecker] = useState(false);
    const [tempData, setTempData] = useState([]);

    let customData = require('../utils/data.json') ;
    storeData(customData,'data')

    function filterDate(desc: boolean){
        //Descending order (true)
        const sorted = data.sort((a: { date: any; time: any; },b: { date: any; time: any; })=>{
            const myMomentObjectA = moment(a.date, 'MMM DD, YYYY')
            const myMomentObjectB = moment(b.date, 'MMM DD, YYYY')

            const dateA = myMomentObjectA.valueOf();
            const dateB = myMomentObjectB.valueOf();
            if(dateA > dateB){
              return desc?-1:1; // return -1 here for DESC order
            }
            return desc?1:-1 // return 1 here for DESC Order
          });
          return sorted
    }

    async function toogleswitch(checked: boolean){
        setIsEnabled(checked)
        if(checked){
            const res  =  await onFaceId();
            if(res){
                setIsEnabled(true)
                onUpdateVisible(true)
            }else{
                setIsEnabled(false)
                onUpdateVisible(false)
            }
        }else{
            setIsEnabled(false)
            onUpdateVisible(false)
        }
    }

    function sorting(): void {
        console.log('aas',sort)
        setSort(!sort)
        filterDate(sort);
    }

    async function gatherData() {
        setIsLoading(true)
        setTimeout(async function(){
            if(!checker){
                let GatheredData =  await getData('data')
                setData(GatheredData)
            }
            setChecker(true)
            setIsLoading(false)
            getDataStorate()
        }, 1000)
    }

    useEffect(() => {
        gatherData();        
    }, [])

    async function AddData (value: any){
        let newData = await getData('addData')
        let temporary: any = []
        temporary = [newData,...data]
        setTempData(temporary)
        getDataStorate()

    }

    async function getDataStorate(){
        
        if(tempData.length!=0){
            setData(tempData)
        }
    }

    return(
        <View style={{flex:1}}>
            {false?<Loading loading="true"/>
            :
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Text style={styles.tittle}> Transaction History</Text>
                </View>
                <View style={styles.switches}>
                    <Icon name='eye' size={20}/>
                    <Switch
                        thumbColor={isEnabled ? 'green' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toogleswitch}
                        value={isEnabled}
                        style={{marginHorizontal:5}}
                    />
                    <Icon name='eye-with-line' size={20} />
                    <IconFontAwesome style={{marginRight:15,justifyContent:'flex-start'}} name='sort' size={25} onPress={()=>sorting()}/>
                </View>
                
                <View style={styles.body}>
                <FlatList 
                    style={{ width: '100%',height:10,zIndex:-10}}
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    renderItem={({ item  }) => <ListContent item={item}  /> }
                    onRefresh={gatherData}
                    refreshing={isLoading}
                />
                {/* FAB */}
                <TouchableOpacity style={styles.fab} onPress={()=>setIsVisible(!isVisible)}>
                    <Icon name='plus' size={60}  />
                </TouchableOpacity>
                </View>
                <AddModal visible={isVisible} onClick={setIsVisible} onAddItem={AddData}/>
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
        marginTop:20,
        flex :1,
        justifyContent:'center',
        alignItems: 'center'
    },
    tittle : {
        fontSize:24,
    },
    body:{
        flex :9,
        justifyContent:'center',
        alignItems: 'center'
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
    fab :
    {
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        backgroundColor: '#ee6e73',                                    
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10, 
    },switches: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        marginLeft:20,
        marginBottom:10,

    }, centeredView: {
        flex: 1,
       
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        },
    modalView: {
            width:300,
            height:300,
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                    width: 0,
                    height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
        },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
       
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    input: {
            height: 40,
            width:200,
            margin: 12,
            borderWidth: 1,
            padding: 10,
    },
    });

const mapToStateProps =(state:ApplicationState) =>({
    UserReducer: state.UserReducer
})

const TransactionHistory = connect(mapToStateProps, {onUpdateVisible})(_TransactionHistory)

export {TransactionHistory}

