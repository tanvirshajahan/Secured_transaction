import React from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;
return (
    
    <View style={styles.container}>
      <Image 
          style={{height:150,width:150}} 
          source={require('../../src/images/Blocks-1s-200px.gif')} 
      />
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding:15
    },
});
export default Loader;