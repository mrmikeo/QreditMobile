import { IState } from './types';
import { ActionType } from '../enums/ActionTypes'

function reducer(state: IState, { type, payload }: any): object {
  switch (type) {
    case ActionType.UNLOCK_APP:
      return { ...state, appUnlocked: true };

    case ActionType.LOCK_APP:
      return { ...state, appUnlocked: false };

    default:
      return state;
  }
}

export default reducer;