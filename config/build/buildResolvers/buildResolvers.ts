import { ResolveOptions } from 'webpack';
import { BuildOptions } from '../types/config';

export const buildResolvers = (options: BuildOptions): ResolveOptions => {
    return {
        extensions: ['.tsx', '.ts', '.js',],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {
            '@': options.paths.src,
        },
        fallback: {
            "crypto": false,
            "os": false,
            "path": false,
            "stream": false
        }
        // fallback: {
        //     "path": require.resolve("path-browserify"),
        //     "os": require.resolve("os-browserify/browser"),
        //     "crypto": require.resolve("crypto-browserify"),
        //     "stream": require.resolve("stream-browserify"),
        //     "vm": require.resolve("vm-browserify")
        // }
    };
}
