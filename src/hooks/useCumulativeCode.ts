import { useTypedSelector } from "./";

export const useCumulativeCode = (cellId: string) => {
    const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
            const el = document.getElementById('root');
            if (typeof value === 'object') {
                // react element
                if (value.$$typeof && value.props) {
                    _ReactDOM.render(value, el);
                }
                
                // js objects
                else {
                    el.innerHTML = JSON.stringify(value);
                }
            }

            // primitive
            else {
                el.innerHTML = value;
            }
        };
    `;

    const showFuncNoop = `var show = () => {};`;

    const cumulativeCode =
        useTypedSelector(state => {
            if (state.cells) {
                const { data, order } = state.cells;
                const orderedCells = order.map(id => data[id]);
                // return orderedCells.reduce((acc, cell) => acc + cell.type === 'code' ? cell.content + '\n': '', '');
                return orderedCells.reduce((acc, c) => {
                    if (c.type === 'code') {
                        if (c.id === cellId) {
                            acc += showFunc
                        } else {
                            acc += showFuncNoop
                        }
                        return acc + c.content + '\n'
                    } else {
                        return acc;
                    }
                }, '')
            }
            return '';
        });

    return cumulativeCode;
}