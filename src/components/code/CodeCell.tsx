import { Cell } from '../../state';
import Preview from './preview/Preview';
import Resizable from '../resizable/Resizable';
import CodeEditor from './editor/CodeEditor';
import { useActions, useTypedSelector } from '../../hooks';

interface CodeProps {
    cell: Cell
}

const Code: React.FC<CodeProps> = ({ cell }) => {

    const { updateCell } = useActions();
    
    const bundle = useTypedSelector(state => state.bundles && state.bundles[cell.id]);

    return (
        <Resizable direction='vertical'>
            <div style={{ display: 'flex', height: 'calc(100% - 10px)' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={value => updateCell(cell.id, value)}
                    />
                </Resizable>
                <Preview code={bundle?.code || ''} error={bundle?.err || ''} />
            </div>
        </Resizable>
    );
}

export default Code;