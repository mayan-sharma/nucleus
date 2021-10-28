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

    if (cell?.type === 'markdown') {
        next(action);
        return;
    };

    clearTimeout(timer);
    timer = setTimeout(async () => {
        console.log('Starting bundling');
        const output = await bundle(action.payload.content);
        dispatch({
            type: ActionType.BUNDLE_CREATED,
            payload: {
                cellId: action.payload.id,
                bundle: output
            }
        });
        console.log('Bundle created');
    }, 1000);

    next(action);
}