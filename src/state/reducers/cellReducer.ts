import produce from 'immer';

import { Cell } from "../cell";
import { Action } from '../actions';
import { randomId } from '../../utils/randomId';
import { ActionType } from "../action-types";

interface CellState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell;
    };
}

const initialState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const reducer = produce((state: CellState = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.UPDATE_CELL:
            const { id, content } = action.payload;
            state.data[id].content = content;
            return state;          
        
        case ActionType.DELETE_CELL:
            delete state.data[action.payload];
            state.order = state.order.filter(id => id !== action.payload);
            return state;

        case ActionType.MOVE_CELL:
            const { direction } = action.payload;
            const currIdx = state.order.findIndex(id => id === action.payload.id);
            const newIdx = direction === 'up' ? currIdx - 1 : currIdx + 1;

            if (newIdx < 0 || newIdx === state.order.length) return;
        
            state.order[currIdx] = state.order[newIdx];
            state.order[newIdx] = action.payload.id;
            return state;

        case ActionType.INSERT_CELL_BEFORE:
            const cell: Cell = {
                content: '',
                type: action.payload.type,
                id: randomId()
            }

            state.data[cell.id] = cell;
            const idx = state.order.findIndex(id => id === action.payload.id);

            if (idx < 0) state.order.push(cell.id);
            else state.order.splice(idx, 0, cell.id);
            return state;

        default: return state;
    }
})

export default reducer;