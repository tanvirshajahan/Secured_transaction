import React, { useEffect, useState } from 'react'
import {View, FlatList, Text, StyleSheet,Dimensions, TouchableOpacity, Switch} from 'react-native'
import Loading from '../utils/Loader';
import { onFaceId } from '../utils';
import { ListContent } from '../components/ListContent';
import Icon from 'react-native-vector-icons/Entypo';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { UserState,onUpdateVisible, ApplicationState} from '../redux';
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
    const [vehicleData, setVehicleData] = useState<any[]>([]);

    let customData = require('../utils/data.json') ;



    function filterDate(desc: boolean){
        //Descending order (true)
        const sorted = customData.sort((a: { date: any; time: any; },b: { date: any; time: any; })=>{
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
        setSort(!sort)
        filterDate(sort);
    }

    async function gatherData() {
        storeData(customData,'data')
       let GatheredData =  await getData('data')
       setData(GatheredData)
    //    console.log([...data,data],'a')
    //    console.log(vehicleData,'a')
    //    console.log(customData,'a')
    }

    useEffect(() => {
        gatherData();
        // console.log(vehicleData,'a')
        
    }, [])

    function AddData (value: any){
        console.log('123zz',value)
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
                        // trackColor={{false: '#767577', true: '#81b0ff'}}
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
                    data={customData}
                    renderItem={({ item  }) => <ListContent item={item}  /> }
                    // ItemSeparatorComponent={() => <View style={styles.separator} />}
                    //onScrollEndDrag={() => this.loadMoreData()}
                    // ListFooterComponent={this.renderFooter.bind(this)}
                    // onEndReached={this.onEndReached.bind(this)}
                    // onEndReachedThreshold={0.5}
                    // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
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

    }
})

const mapToStateProps =(state:ApplicationState) =>({
    UserReducer: state.UserReducer
})

const TransactionHistory = connect(mapToStateProps, {onUpdateVisible})(_TransactionHistory)

export {TransactionHistory}


