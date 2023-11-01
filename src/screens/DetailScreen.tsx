import React from 'react'
import {View, FlatList, Text, StyleSheet,Dimensions, Image, Alert} from 'react-native'
import Loading from '../utils/Loader';
import * as LocalAuthentication from 'expo-local-authentication';

  type ItemProps = {title: string};

  const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Text>{title}</Text>
    </View>
  );
export const DetailScreen = () => {
    const customData = require('../utils/data.json');
    const onFaceId =async () => {
        try{
            const isCompatible = await LocalAuthentication.hasHardwareAsync();

            if(! isCompatible){
                throw new Error('Your device isn\'t compatible')
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync();

            if(! isEnrolled){
                throw new Error('No Faces / Fingers found')
            }

            await LocalAuthentication.authenticateAsync();

            Alert.alert('Authenticated', 'Welcome back!')

        }catch (error){
            Alert.alert('Error', 'An error occured')

        }

    }
    onFaceId

    return(
        <View style={{flex:1}}>
            {false?<Loading loading="true"/>
            :
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <Text> Transaction Details</Text>
                </View>
                <View style={styles.body}>
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
