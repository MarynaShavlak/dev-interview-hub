import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';
import  Dotenv from 'dotenv-webpack';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import { BuildOptions } from '../types/config';



// const Dotenv = require('dotenv-webpack');

export const buildPlugins = ({
    paths, isDev, apiUrl, project,
}: BuildOptions): webpack.WebpackPluginInstance[] =>{
    const isProd = !isDev;
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,

        }),
        new FaviconsWebpackPlugin({
            logo: 'src/shared/assets/images/logo.png',
            mode: 'webapp',
            devMode: 'webapp',
            prefix: 'assets/favicons/',
            cache: true,
            inject: true,
            favicons: {
                background: '#fff',
                theme_color: '#333',
            }
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new CircularDependencyPlugin({
            exclude: /node_modules/,
            failOnError: true,
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                diagnosticOptions: {
                    semantic: true,
                    syntactic: true,
                },
            },
        }),
        new Dotenv({
            // path: '../../../.env'
        }),


    ];

    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin());
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));

    }
    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
        plugins.push(new CopyPlugin({
            patterns: [
                { from: paths.locales, to: paths.buildLocales },
                { from: `${paths.src}/favicon.ico`, to: paths.build },
                { from: `${paths.src}/manifest.json`, to: paths.build  },
                { from: `${paths.src}/logo192.png`, to: paths.build  },
                { from: `${paths.src}/logo512.png`, to: paths.build  },
            ],
        }));
        plugins.push(new InjectManifest( {
            swSrc: './config/serviceWorker/config-sw.js',
                      swDest: `${paths.build}/sw.js`,
            exclude: [/\.map$/, /asset-manifest\.json$/],
        } ))
    }

    return plugins;
}
