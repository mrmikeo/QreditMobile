import React from 'react';
import { IState } from './types';
import reducers from './reducers';

const intialState: IState = {
  privateKey: '',
  nodes : []
};

export const Store = React.createContext<IState | any>(intialState);

export function StoreProvider({ children }: JSX.ElementChildrenAttribute): React.ReactElement {
  const [state, dispatch] = React.useReducer(reducers, intialState);

  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;
}