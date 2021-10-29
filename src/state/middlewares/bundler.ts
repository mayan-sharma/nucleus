import { Middleware } from ".";
import { ActionType } from '../action-types';
import bundle from '../../bundler';

let timer: any;

export const bundler: Middleware = ({ getState, dispatch }) => (next) => (action) => {
    if (action.type !== ActionType.UPDATE_CELL) {
        next(action);
        return;
    }

    const { cells } = getState();
    const cell = cells?.data[action.payload.id];
    
    if (!cell || cell.type === 'markdown') {
        next(action);
        return;
    }

    clearTimeout(timer);
    timer = setTimeout(async () => {
        dispatch({ 
            type: ActionType.BUNDLE_START,
            payload: { cellId: cell.id }
        });
    
        const result = await bundle(action.payload.content);
    
        dispatch({
            type: ActionType.BUNDLE_COMPLETE,
            payload: {
                cellId: cell.id,
                bundle: result
            }
        });
    }, 1000);

    next(action);
}