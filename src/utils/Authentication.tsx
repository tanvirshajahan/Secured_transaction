import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';
import { onUpdateVisible } from '../redux';


export async function onFaceId(){
    try{
        const isCompatible = await LocalAuthentication.hasHardwareAsync();

        if(! isCompatible){
            throw new Error('Your device isn\'t compatible')
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if(! isEnrolled){
            throw new Error('No Faces / Fingers found')
        }

        const res = await LocalAuthentication.authenticateAsync();
        if(!res.success){
            Alert.alert('Authentication Failed', 'Retry Again')
            return(false)

        }else{
            Alert.alert('Authenticated', 'Welcome!')
            return(true)
        }
    }catch (error){
        Alert.alert('Error', 'An error occured '+error)
    }

}
