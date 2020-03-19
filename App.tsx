import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StoreProvider } from './store';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

const Stack = createStackNavigator();
import Colors from './constants/Colors';
import WalletScreen from './screens/WalletScreen';
import { Video } from 'expo-av';
import { useState } from 'react';

export default function App(props) {

  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [videoPlayed, setvideoPlayed] = useState(false);

  const [privateKey, setPrivateKey] = React.useState();

  function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // setprivateKey(await SecureStore.getItemAsync('privateKey'))

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          'Montserrat': require('./assets/fonts/Montserrat/Montserrat-Regular.ttf')
        });

        await cacheImages([
          require('./assets/images/xqr-dark-wide.png'),
          require('./assets/videos/intro.mp4'),
        ]);

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);



  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {

    if (!__DEV__)
      if (!videoPlayed)
        return (
          <Video
            source={require('./assets/videos/splash.mp4')}
            rate={1.1}
            volume={1.0}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            onPlaybackStatusUpdate={status => {
              if (status.didJustFinish)
                setvideoPlayed(true)
            }}
            style={{ width: '100%', height: '100%' }}
          />
        )

    return (
      <StoreProvider>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {
            privateKey
              ? <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                <Stack.Navigator>
                  <Stack.Screen name="Root" component={BottomTabNavigator} />
                </Stack.Navigator>
              </NavigationContainer>
              : <WalletScreen onSetPrivateKey={(key) => {console.log(key); setPrivateKey(key)}} />
          }
        </View>
      </StoreProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bitFlexBackground,
  },
});
