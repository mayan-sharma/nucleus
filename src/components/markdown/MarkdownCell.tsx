import { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

import './markdown-cell.css';
import { Cell } from '../../state';
import { useActions } from '../../hooks/useActions';

interface MarkdownCellProps {
    cell: Cell
}

const MarkdownCell: React.FC<MarkdownCellProps> = ({ cell }) => {
    
    const { updateCell } = useActions();
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
                    value={cell.content}
                    onChange={(val) => updateCell(cell.id, val!)}
                />
            </div>
        );
    }

    return (
        <div className='markdown-editor card' onClick={() => setEditing(true)}>
            <MDEditor.Markdown source={cell.content || 'Click to edit'} />
        </div>
    );
}

export default MarkdownCell;