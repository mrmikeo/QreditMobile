import { Dimensions } from "react-native";

export enum Screen {
    //statusBar = Constants.statusBarHeight,
    tabBarHeight = 49,
    height = Dimensions.get('window').height,
    width = Dimensions.get('window').width,
    fontScale = Dimensions.get('window').fontScale,
    scale = Dimensions.get('window').scale,
    chartHeight = Dimensions.get('window').height / 2 + 20,
  }