import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';

import { unkpResolvePlugin } from '../plugins/unpk-resolve';
import { unpkLoadPlugin } from '../plugins/unpk-load';

const Code = () => {
    
    const ref = useRef<boolean>(false); 
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const startService = async () => {
        await esbuild.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
        });
        ref.current = true;
    }

    useEffect(() => {
        startService();
    }, []);

    const handleClick = async () => {
        try {
            if (!ref.current) return;
    
            const res = await esbuild.build({
                entryPoints: ['index.js'],
                bundle: true,
                write: false,
                plugins: [unkpResolvePlugin(), unpkLoadPlugin(input)],
                define: {
                    'process.env.NODE_ENV': '"production"',
                    global: 'window'
                }
            })
    
            setCode(res.outputFiles[0].text);
     
        } catch (err) {
            console.log(err);
        }
    }

    const html = `
        <script>
            ${code}
        </script>
    `;
    
    return (
        <div>
            <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
            ></textarea>
            <div>
                <button onClick={handleClick}>Submit</button>
            </div>
            <pre>{code}</pre>
            <iframe sandbox='allow-scripts' srcDoc={html} />
        </div>
    );
}

export default Code;