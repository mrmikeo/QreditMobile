import * as React from 'react';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import * as ReactNative from 'react-native';

export type Dispatch = React.Dispatch<any>;

export interface IState {
  privateKey: string;
}

export interface IAction {
  type: number;
  payload: any;
}
