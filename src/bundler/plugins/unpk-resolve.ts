import * as esbuild from 'esbuild-wasm';

export const unkpResolvePlugin = () => {
    return {
        name: 'unpk-resolve-plugin',
        setup(build: esbuild.PluginBuild) {
            // resolve index.js
            build.onResolve({ filter: /(^index\.js$)/ }, () => {
                return { namespace: 'a', path: 'index.js' }
            });

            // resolve './' or '../' modules
            build.onResolve({ filter: /^\.+\// }, (args: any) => {
                return {
                    namespace: 'a',
                    path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                }
            });
            
            // resolve main file of any module
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });
        }
    }
}