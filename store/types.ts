import * as React from 'react';
import * as ReactNative from 'react-native';
import { INode } from '../components/API';

export type Dispatch = React.Dispatch<any>;

export interface IState {
  privateKey: string;
  nodes: Array<INode>;
}

export interface IAction {
  type: number;
  payload: any;
}
