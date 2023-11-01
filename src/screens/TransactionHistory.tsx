import React from 'react'
import {View, FlatList, Text, StyleSheet,Dimensions, Image, TouchableOpacity} from 'react-native'
import Loading from '../utils/Loader';
import { useNavigation } from '../utils';
import { FAB } from 'react-native-elements';


const {width } = Dimensions.get('window');



  type ItemProps = {title: string};

  const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );
export const TransactionHistory = () => {

    const customData = require('../utils/data.json');

    return(
        <View style={{flex:1}}>
            {false?<Loading loading="true"/>
            :
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Text> Transaction History</Text>
                </View>
                <View style={styles.body}>
                <FlatList 
                    style={{ width: '100%',height:10,zIndex:-10}}
                    keyExtractor={(item, index) => index.toString()}
                    data={customData}
                    renderItem={({ item }) => <ListContent item ={item}/> }
                    // ItemSeparatorComponent={() => <View style={styles.separator} />}
                    //onScrollEndDrag={() => this.loadMoreData()}
                    // ListFooterComponent={this.renderFooter.bind(this)}
                    // onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={0.5}
                    // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                />
                    
                </View>
            </View>
            }
        </View>
    )

}

function ListContent(item: any){
    const { navigate } = useNavigation()
    console.log('123', item)

    let {name,time,currency,type,date} = item.item;
    console.log('123',name)

    // var date =item.item.startDateTime;
    // var status =item.item.status.key;
    // var statusName =item.item.status.value;
    // var brand =item.item.customerVehicleData.vehicleData.brand;
    // var model =item.item.customerVehicleData.vehicleData.model;
    // var series =item.item.customerVehicleData.vehicleData.series;
    // var registationNumber =item.item.customerVehicleData.registrationNumber;

    // console.log(item.item.vehicleData.brand , 'item valss')

    //var reasonRejection =status === 'Rejected'?item.item.reasonRejection.value: '';
    // var reasonRejection ='';

    // var finalDateTime = (date);
    // var color,backgroundColor;
    // switch(status)
    // {
    //     case 'INPROGRESS':
    //         color='#000';
    //         backgroundColor='#E3E3E3';
    //     break;
    //     case 'CANCELLED':
    //         color='#fff';
    //         backgroundColor='#EB0024';
    //     break;
    //     case 'COMPLETED':
    //         color='#fff';
    //         backgroundColor='#31BC7C';
    //     break;
    // }

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
    container:{
        flex:1,
    },
    navigation:{
        flex :2,
        justifyContent:'center',
        alignItems: 'center'
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
    cards: {
        width: width - 30,
        
        marginBottom: 20, 
        alignSelf:'center', 
        // borderWidth: 2, 
        borderRadius:Math.round(6)
    }
})
