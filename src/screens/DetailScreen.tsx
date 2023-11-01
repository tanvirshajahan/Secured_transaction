import React from 'react'
import {View, FlatList, Text, StyleSheet,Dimensions, Image} from 'react-native'
import Loading from '../utils/Loader';

  type ItemProps = {title: string};

  const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );
export const DetailScreen = () => {
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
                {/* <FlatList 
                                style={{ width: '100%',height:10,zIndex:-10}}
                                keyExtractor={(item, index) => index.toString()}
                                data={customData}
                                renderItem={({ item }) => <ListContent props={this.props} item ={item}/> }
                                // ItemSeparatorComponent={() => <View style={styles.separator} />}
                                //onScrollEndDrag={() => this.loadMoreData()}
                                // ListFooterComponent={this.renderFooter.bind(this)}
                                // onEndReached={this.onEndReached.bind(this)}
                                onEndReachedThreshold={0.5}
                                // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                            /> */}
                    
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
    }
})
