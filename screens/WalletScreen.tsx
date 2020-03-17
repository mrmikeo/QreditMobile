import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Modal, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { RectButton, ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Screen } from '../enums/Screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useState } from 'react';


export default function WalletScreen() {

  const [createAccountModalVisible, setcreateAccountModalVisible] = useState(false);



  return (
    <SafeAreaView style={styles.container}>

      <Modal
        animationType="slide"
        transparent={false}
        visible={createAccountModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <SafeAreaView style={styles.container}>

        </SafeAreaView>
      </Modal>

      <View style={{ flex: 1, alignItems: "center", paddingTop: 30, justifyContent: "center" }}>
        <Image
          style={{ width: Screen.width - Screen.width / 4 }}
          source={require('../assets/images/xqr-dark-wide.png')}
          resizeMode={'contain'}
        />
      </View>



      <TouchableOpacity
        style={[styles.touchButton, { backgroundColor: Colors.bitFlexGreenColor, marginTop: 30, margin: 25, marginBottom: 0 }, styles.shadowButtom, { shadowColor: Colors.bitFlexGreenColor }]}
        onPress={() => { setcreateAccountModalVisible(!createAccountModalVisible) }}>
        <Text style={[styles.title, { fontWeight: '600', fontSize: RFValue(16), color: 'white', fontFamily: 'Montserrat' }]}>CREATE NEW WALLET</Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={[styles.touchButton, { backgroundColor: Colors.bitFlexLightBlue, marginTop: 30, margin: 25, marginBottom: 0 }, styles.shadowButtom]}
        onPress={() => { }}>
        <Text style={[styles.title, { fontWeight: '600', fontSize: RFValue(16), color: 'white', fontFamily: 'Montserrat' }]}>IMPORT FROM PASSPHRASE</Text>
      </TouchableOpacity>


      <View style={{ flex: 0.6, alignItems: "center", paddingTop: 30, justifyContent: "center" }}>

      </View>

    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bitFlexBackground,
  },
  shadowButtom: {
    shadowColor: Colors.bitFlexLightBlue,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,

    elevation: 0
  },
  title: {
    fontSize: RFValue(15),
    fontWeight: '500',
    color: 'white',
    paddingVertical: 13,
    fontFamily: 'Montserrat'
  },
  touchButton: {
    zIndex: -1,
    backgroundColor: Colors.bitFlexGreenColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    margin: 6
  },
});
