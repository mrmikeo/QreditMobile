import { IAction, Dispatch } from './types';
import { ActionType } from '../enums/ActionTypes'
import { INode } from '../components/API';

export async function UnlockApp(dispatch: Dispatch): Promise<any> {
  dispatch({
    type: ActionType.UNLOCK_APP
  });
}

export async function LockApp(dispatch: Dispatch): Promise<any> {
  dispatch({
    type: ActionType.LOCK_APP
  });
}

export async function SetNodesList(dispatch: Dispatch, nodes: Array<INode>): Promise<any> {
  dispatch({
    type: ActionType.SET_NODES_LIST,
    payload: nodes
  });
}

export async function SetPrivateKey(dispatch: Dispatch, key: string): Promise<any> {
  dispatch({
    type: ActionType.SET_PRIVATE_KEY,
    payload: key
  });
}


