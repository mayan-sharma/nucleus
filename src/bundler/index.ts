import * as esbuild from 'esbuild-wasm';

import { unkpResolvePlugin } from './plugins/unpk-resolve';
import { unpkLoadPlugin } from './plugins/unpk-load';

let isInitiated = false;

const bundler = async (rawCode: string) => {

    if (!isInitiated) {
        await esbuild.initialize({
            worker: true,
            wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm'
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

    return res.outputFiles[0].text;
}

export default bundler;