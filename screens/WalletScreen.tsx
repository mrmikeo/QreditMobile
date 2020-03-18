import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, Modal, Alert, ActivityIndicator, TouchableWithoutFeedback, Clipboard } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import { Screen } from '../enums/Screen';
import { RFValue } from 'react-native-responsive-fontsize';
import { useState } from 'react';
import axios from 'axios'

import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import CheckBox from 'react-native-check-box';
import { GetNodesList } from '../components/API';
import { Store } from '../store/index';
import { SetNodesList, SetPrivateKey } from '../store/actions';

export default function WalletScreen({ onSetPrivateKey }) {

  const {
    dispatch
  } = React.useContext(Store);

  const [createAccountModalVisible, setcreateAccountModalVisible] = useState(false);
  const [loadWalletModal, setloadWalletModal] = useState(false);
  const [createMnemonic, setcreateMnemonic] = useState('LOADING');
  const [mnemonicDone, setmnemonicDone] = useState(false);
  const [checkBox, setcheckBox] = useState(false);
  const [userMneminicEntry, setuserMneminicEntry] = useState<string>();

  React.useEffect(() => {
    async function loadDataAsync() {
      SetNodesList(dispatch, await GetNodesList());
    }

    loadDataAsync();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={createAccountModalVisible}
        onShow={async () => {
          axios.get('https://qreditbipserivce.azurewebsites.net/api/GenerateRandomMnemonic').then(response => {
            axios.post('https://qreditbipserivce.azurewebsites.net/api/GetKeyFromMnemonic', response.data).then(async responseKey => {
              setcreateMnemonic(response.data)
              SetPrivateKey(dispatch, responseKey.data)

              setmnemonicDone(true)
              var filename = await FileSystem.documentDirectory + "XQR-wallet-" + Date.now() + ".txt";
              FileSystem.writeAsStringAsync(filename, response.data).then(() => {
                Sharing.isAvailableAsync().then(available => {
                  if (available)
                    Sharing.shareAsync(filename)
                })
              })

              onSetPrivateKey(responseKey.data);
            });
          });
        }}
      >
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 0.3, alignItems: "center", paddingTop: 30, justifyContent: "center" }}>
            <Image
              style={{ width: Screen.width - Screen.width / 2 }}
              source={require('../assets/images/xqr-dark-wide.png')}
              resizeMode={'contain'}
            />
          </View>
          {
            !mnemonicDone ?
              <>
                <Text style={{ fontSize: RFValue(20), textAlign: 'center', fontFamily: 'Montserrat', color: Colors.bitFlexLightColor, paddingBottom: 25 }}>Generating Wallet...</Text>
                <ActivityIndicator size="large" color={Colors.bitFlexBloodRed} />
              </>
              :
              <>
                <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center", padding: 5, margin: 5 }}>
                  <Text style={{ fontSize: RFValue(20), textAlign: 'center', fontFamily: 'Montserrat', color: Colors.bitFlexLightColor }}>This is your BIP39 generated {'\n'} mnemonic passphrase</Text>
                </View>
                <View style={{ flex: 0.85, borderColor: Colors.bitFlexBloodRed, borderWidth: 2, borderStyle: 'dashed', margin: 25, padding: 15 }}>
                  <TouchableWithoutFeedback onPress={() => {
                    Clipboard.setString(createMnemonic)
                    Alert.alert("Copied to clipboard")
                  }}>
                    <Text style={{ fontSize: RFValue(28), color: Colors.bitFlexLightColor }}>{createMnemonic}</Text>
                  </TouchableWithoutFeedback>

                </View>
                <View style={{ flex: 1 }}>
                  <CheckBox
                    onClick={() => {
                      setcheckBox(!checkBox)
                    }}
                    style={{ marginLeft: 25, marginRight: 25 }}
                    isChecked={checkBox}
                    leftText={"I've securely stored my passphrase"}
                    leftTextStyle={{ fontSize: RFValue(14), color: Colors.bitFlexLightColor }}
                    checkBoxColor={Colors.bitFlexGoldenColor}
                  />
                  <View style={{ opacity: checkBox ? 1 : 0.2 }}>
                    <TouchableOpacity
                      disabled={!checkBox}
                      style={[styles.touchButton, { backgroundColor: Colors.bitFlexLightBlue, marginTop: 30, margin: 25, marginBottom: 0 }, styles.shadowButtom]}
                      onPress={() => { alert("GO NEXT") }}>
                      <Text style={[styles.title, { fontWeight: '600', fontSize: RFValue(22), color: 'white', fontFamily: 'Montserrat' }]}>CONTINUE</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
          }

        </SafeAreaView>
      </Modal>

      <Modal
        animationType="slide"
        transparent={false}
        visible={loadWalletModal}
      >
        <SafeAreaView style={styles.container}>
          <View style={{ flex: 0.3, alignItems: "center", paddingTop: 30, justifyContent: "center" }}>
            <Image
              style={{ width: Screen.width - Screen.width / 2 }}
              source={require('../assets/images/xqr-dark-wide.png')}
              resizeMode={'contain'}
            />
          </View>

          <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center", padding: 5, margin: 5 }}>
            <Text style={{ fontSize: RFValue(20), textAlign: 'center', fontFamily: 'Montserrat', color: Colors.bitFlexLightColor }}>Enter your mnemonic passphrase</Text>
          </View>

          <View style={{ flex: 1, borderColor: Colors.bitFlexBloodRed, borderWidth: 2, borderStyle: 'dashed', margin: 25, padding: 15 }}>
            <TextInput
              style={{ flex: 1, borderColor: 'gray', borderWidth: 0, fontSize: RFValue(28), color: Colors.bitFlexLightColor }}
              onChangeText={text => setuserMneminicEntry(text)}
              multiline={true}
              value={userMneminicEntry}
            />

          </View>

          <View style={{ flex: 0.6 }}>
            <TouchableOpacity
              style={[styles.touchButton, { backgroundColor: Colors.bitFlexLightBlue, marginTop: 30, margin: 25, marginBottom: 0 }, styles.shadowButtom]}
              onPress={() => {

                axios.post('https://qreditbipserivce.azurewebsites.net/api/GetKeyFromMnemonic', userMneminicEntry).then(async responseKey => {
                  alert(responseKey.data)
                });

              }}>
              <Text style={[styles.title, { fontWeight: '600', fontSize: RFValue(22), color: 'white', fontFamily: 'Montserrat' }]}>DECRYPT WALLET</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.touchButton, { backgroundColor: Colors.bitFlexLightBlue, marginLeft: 25, marginRight: 25, marginBottom: 0 }, styles.shadowButtom]}
              onPress={() => {

                setloadWalletModal(false)

              }}>
              <Text style={[styles.title, { fontWeight: '600', fontSize: RFValue(22), color: 'white', fontFamily: 'Montserrat' }]}>CANCEL</Text>
            </TouchableOpacity>
          </View>

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
        onPress={() => { setloadWalletModal(true) }}>
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
