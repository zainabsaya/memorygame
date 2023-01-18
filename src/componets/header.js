
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
const Header= () => {
return (
<View style={Styles.container}>
<Text>MemoryGame</Text>
</View>
  )
}
export default Header;
export const Styles = StyleSheet.create({
    container:{
        height:30,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    }
})