import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as WebBrowser from 'expo-web-browser';

import { MonoText } from '../components/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';
import qreditApi from '../components/qreditApi'
import { Store } from '../store';
import qreditCrypto from '../components/qreditCrypto';

import Buffer from 'buffer'

var RIPEMD160 = require('ripemd160')
const bs58 = require('bs58')

import {ECPair, fromSeed} from '../components/ecpair'

export default function HomeScreen() {

  const {
    state: { privateKey, nodes },
    dispatch
  } = React.useContext(Store);


  React.useEffect(() => {
    async function loadDataAsync() {
      //console.log("https://" + nodes[0].ip + ":" + nodes[0].port)
      var api = new qreditApi("https://qredit.cloud/api/v2");
      // console.log(await api.getBlockHeight())

      new qreditCrypto().getKeys("MYPASSWORD")

      
      var keys = await new qreditCrypto().getKeys("This is a test");
      

      // const buf = Buffer.Buffer.from(keys.d);

      console.log(keys.d)
    }

    loadDataAsync();

  }, []);
  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
