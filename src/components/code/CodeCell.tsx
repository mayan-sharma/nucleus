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

    useEffect(() => {
        const timer = setTimeout(() => {
            createBundle(cell.id, cell.content);
        }, 1000);

        return () => {
            clearTimeout(timer);
        }

    }, [cell.id, cell.content]);

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