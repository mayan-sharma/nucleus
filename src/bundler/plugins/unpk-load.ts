import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

// uses IndexDB of browser
const fileCache = localForage.createInstance({
    name: 'filecache'
});

export const unpkLoadPlugin = (inputCode: string) => {
    return {
        name: 'unpk-load-plugin',
        setup(build: esbuild.PluginBuild) {
            // build index.js
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode
                }
            });

            // check cache - returning null here makes it go to the next onLoad function
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                return cachedResult ? cachedResult : null; 
            })

            // build css files
            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const { data, request }: { data: string, request: any } = await axios.get(args.path);

                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");
                
                const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                `;

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                await fileCache.setItem(args.path, result);
                return result;
            });

            // build js files
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const { data, request }: { data: string, request: any } = await axios.get(args.path);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: data,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                await fileCache.setItem(args.path, result);
                return result;
            });
        }
    }
}