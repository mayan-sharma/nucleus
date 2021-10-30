import { Dispatch } from 'redux';

import bundle from '../../bundler';
import { Action } from '../actions';
import { ActionType } from '../action-types';

export const createBundle = (cellId: string, input: string) => async (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.BUNDLE_START,
        payload: { cellId }
    });

    const result = await bundle(input);

    dispatch({
        type: ActionType.BUNDLE_COMPLETE,
        payload: {
            cellId,
            bundle: result           
        }
    });
}