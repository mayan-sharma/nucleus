import { useRef } from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

import './code-editor.css';

interface CodeEditorProps {
    initialValue: string;
    onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
    
    const editorRef = useRef<any>();

    const handleMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    }

    const handleFormat = () => {
        const unformatted = editorRef.current.getModel().getValue();
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');
        editorRef.current.setValue(formatted);
    }
    
    return (
        <div className='editor-container'>
            <button className='absolute z-10 top-1 right-3' onClick={handleFormat}>Format</button>
            <MonacoEditor
                onChange={(value, ev) => onChange(value || '')}
                defaultValue={initialValue}
                onMount={handleMount}
                height='100%'
                language='javascript'
                theme='vs-dark'
                options={{
                    wordWrap: 'on',
                    minimap: { enabled: false },
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true
                }}
            />
        </div>
    );
}

export default CodeEditor