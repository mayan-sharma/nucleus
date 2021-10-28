import produce from 'immer';

import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundleState {
    [key: string]: {
        code: string;
        err: string;
    }
}

const initialState: BundleState = {};

const reducer = produce((state: BundleState = initialState, action: Action): BundleState => {
    switch (action.type) {
        case ActionType.BUNDLE_CREATED:
            state[action.payload.cellId] = action.payload.bundle;
            return state;
        
        default: return state;
    }
});

export default reducer;