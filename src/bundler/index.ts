import * as esbuild from 'esbuild-wasm';

import { unkpResolvePlugin } from './plugins/unpk-resolve';
import { unpkLoadPlugin } from './plugins/unpk-load';

let isInitiated = false;

const bundler = async (rawCode: string) => {
    try {
        if (!isInitiated) {
            await esbuild.initialize({
                worker: true,
                wasmURL: 'https://unpkg.com/esbuild-wasm@0.13.10/esbuild.wasm'
            });
            isInitiated = true;
        }
    
        const res = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unkpResolvePlugin(), unpkLoadPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window'
            }
        });
    
        return  {
            code: res.outputFiles[0].text,
            err: ''
        }
    
    } catch (err: any) {
        console.log('Bundling Error: ', err);
        return {
            code: '',
            err: err.message
        }
    }
}

export default bundler;