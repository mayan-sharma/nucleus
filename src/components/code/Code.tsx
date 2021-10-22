import { useState, useEffect } from 'react';

import CodeEditor from './editor/CodeEditor';
import Preview from './preview/Preview';
import bundler from '../../bundler';
import Resizable from '../resizable/Resizable';

const Code: React.FC = () => {
    
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    // debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            handleBundling();
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [input]);

    const handleBundling = async () => {
        try {
            const res = await bundler(input);
            setCode(res);
            
        } catch (err) {
            console.log(err);
        }
    }
    
    return (
        <Resizable direction='vertical'>
            <div style={{ display: 'flex', height: '100%' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor 
                        initialValue='// Type your code here'
                        onChange={value => setInput(value)}
                    />
                </Resizable>
                <Preview code={code} />
            </div>
        </Resizable>
    );
}

export default Code;