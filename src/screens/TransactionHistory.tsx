import React, { useEffect, useState } from 'react'
import {View, FlatList, Text, StyleSheet,Dimensions, TouchableOpacity, Switch} from 'react-native'
import Loading from '../utils/Loader';
import { onFaceId, useNavigation } from '../utils';
import { ListContent } from '../components/ListContent';
import Icon from 'react-native-vector-icons/Entypo';
import { Connect, connect } from 'react-redux';
import { UserReducer } from '../redux/reducers/userReducer';
import { UserState,onUpdateVisible, ApplicationState, UserAction } from '../redux';

const {width } = Dimensions.get('window');
interface TransactionHistoryProps{
    UserReducer: UserState,
    onUpdateVisible: Function
}


 const _TransactionHistory: React.FC<TransactionHistoryProps> = (props) => {

    const { UserReducer, onUpdateVisible }= props
    
    const [isEnabled, setIsEnabled] = useState(false);
    const customData = require('../utils/data.json') ;

      useEffect(() => {
        console.log('123',UserReducer.visible)

    }, [UserReducer,isEnabled])

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
                    />
                <Icon name='eye-with-line' size={20} />

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
                <TouchableOpacity style={styles.fab} onPress={()=>console.log('123')}>
                    <Icon name='plus' size={60}  />
                </TouchableOpacity>
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
