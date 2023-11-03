import { Dimensions, View,Text, StyleSheet, Modal, Alert, Pressable } from "react-native";
import { ApplicationState, onAddData } from "../redux";
import { connect } from "react-redux";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import { TransactionReducer } from "../redux/reducers/transactionReducer";
import { getData, storeData } from "../utils";
const {width } = Dimensions.get('window');

interface AddModalProps{ 
    visible: boolean,
    onClick: Function,
    onAddItem: Function,

 }

const _AddModal: React.FC<AddModalProps> = (item: any)=>{
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [account, setAccount] = useState('');

    async function AddItem(){
        let a = []
        let b = {
            "id": '1',
            "currency": amount,
            "date": "Nov 7, 2023",
            "name": name,
            "time": "5:21 AM",
            "type": transactionType,
            "description": description
        }

        onAddData(b)
        await storeData(b,'addData')
        item.onAddItem()
        item.onClick(!item.visible);
    }
    return(
        <View>
            <Modal
            style={{ width:200,
                height:200,}}
                animationType="slide"
                transparent={true}
                visible={item.visible}
                onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                item.onClick(!item.visible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => item.onClick(!item.visible)}>
                            <Text style={styles.textStyle}>  X  </Text>
                            </Pressable>
                        <ScrollView>
                            <Text style={styles.modalText}>Add Data!</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setName}
                                value={name}
                                placeholder="name"
                                placeholderTextColor={'grey'}
                            />                        
                            <TextInput
                                style={styles.input}
                                onChangeText={setAmount}
                                value={amount}
                                placeholder="amount"
                                placeholderTextColor={'grey'}
                            />                        
                            <TextInput
                                style={styles.input}
                                onChangeText={setDescription}
                                value={description}
                                placeholder="description"
                                placeholderTextColor={'grey'}
                            />                        
                            <TextInput
                                style={styles.input}
                                onChangeText={setTransactionType}
                                value={transactionType}
                                placeholder="transactionType"
                                placeholderTextColor={'grey'}
                            />                        
                            
                            <Pressable
                            style={[styles.button, styles.buttonSubmit]}
                            onPress={() => AddItem()}>
                            <Text style={styles.textStyle}>Add Data</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
       
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        },
    modalView: {
            width:300,
            height:400,
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 20,
            padding: 35,
            // alignItems: 'center',
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
        backgroundColor: 'red',
        alignSelf: 'flex-end'
    },
    buttonSubmit: {
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
        UserReducer: state.UserReducer,
        TransactionReducer: state.transactionReducer
    })
    
    const AddModal = connect(mapToStateProps,{onAddData})(_AddModal)
    
    export {AddModal}