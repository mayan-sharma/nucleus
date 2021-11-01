import './code-cell.css';
import { useEffect } from 'react';
import { Cell } from '../../state';
import Preview from './preview/Preview';
import CodeEditor from './editor/CodeEditor';
import Resizable from '../resizable/Resizable';
import { useActions, useTypedSelector } from '../../hooks';

interface CodeProps {
    cell: Cell
}

const CodeCell: React.FC<CodeProps> = ({ cell }) => {
    
    const { updateCell, createBundle } = useActions();

    const bundle = useTypedSelector(state => state.bundles && state.bundles[cell.id]);

    const cumulativeCode = useTypedSelector(state => {
            if (state.cells) {
                const { data, order } = state.cells;
                const orderedCells = order.map(id => data[id]);
                return orderedCells.reduce((acc, cell) => acc + cell.content + '\n', '');
            }
            return '';
        });

    useEffect(() => {
        const timer = setTimeout(() => {
            createBundle(cell.id, cumulativeCode);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }

    }, [cell.id, cumulativeCode, createBundle]);

    return (
        <Resizable direction='vertical'>
            <div style={{ display: 'flex', height: 'calc(100% - 10px)' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={value => updateCell(cell.id, value)}
                    />
                </Resizable>
                {bundle?.loading ? (
                    <div className='progress-container'>
                        <progress max='100'>
                            Loading
                        </progress>
                    </div>
                ) : (
                    <Preview code={bundle?.code || ''} error={bundle?.err || ''} />
                )}
            </div>
        </Resizable>
    );
}

export default CodeCell;