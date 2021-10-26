import { useState, useEffect } from 'react';

import { Cell } from '../../state';
import bundler from '../../bundler';
import Preview from './preview/Preview';
import Resizable from '../resizable/Resizable';
import CodeEditor from './editor/CodeEditor';
import { useActions } from '../../hooks/useActions';

interface CodeProps {
    cell: Cell
}

const Code: React.FC<CodeProps> = ({ cell }) => {

    const [code, setCode] = useState('');
    const [err, setErr] = useState('');

    const { updateCell } = useActions();
    
    // debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            handleBundling();
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [cell.content]);

    const handleBundling = async () => {
        try {
            const res = await bundler(cell.content);
            setCode(res.code);
            setErr(res.err);

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Resizable direction='vertical'>
            <div style={{ display: 'flex', height: '100%' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={value => updateCell(cell.id, value)}
                    />
                </Resizable>
                <Preview code={code} error={err} />
            </div>
        </Resizable>
    );
}

export default Code;