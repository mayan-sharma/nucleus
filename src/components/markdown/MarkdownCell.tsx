import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import CodeCell from "../code/CodeCell";
import './markdown-cell.css';

const MarkdownCell: React.FC = () => {
    
    const [text, setText] = useState('Hello');
    const [editing, setEditing] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (ref.current && event.target && ref.current.contains(event.target as Node)) {
                return;
            }
            setEditing(false);
        }
        document.addEventListener('click', listener, { capture: true });
        
        return () => {
            document.removeEventListener('click', listener, { capture: true });
        }
    }, []);

    if (editing) {
        return (
            <div className='markdown-editor' ref={ref}>
                <MDEditor
                    value={text}
                    onChange={(val) => setText(val!)}
                />
            </div>
        );
    }

    return (
        <div className='markdown-editor card' onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={text} />
        </div>
    );
}

export default MarkdownCell;