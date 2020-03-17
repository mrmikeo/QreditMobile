import { IAction, Dispatch } from './types';
import { ActionType } from '../enums/ActionTypes'


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
