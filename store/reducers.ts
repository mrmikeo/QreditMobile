import { IState } from './types';
import { ActionType } from '../enums/ActionTypes'

function reducer(state: IState, { type, payload }: any): object {
  switch (type) {
    case ActionType.UNLOCK_APP:
      return { ...state, appUnlocked: true };

    case ActionType.LOCK_APP:
      return { ...state, appUnlocked: false };

    case ActionType.SET_NODES_LIST:
      return { ...state, nodes: payload };

    case ActionType.SET_PRIVATE_KEY:
      return { ...state, privateKey: payload };

    default:
      return state;
  }
}

export default reducer;