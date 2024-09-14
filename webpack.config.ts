import webpack from 'webpack';
import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';

/**
 * Webpack configuration for a React project with custom build paths and environment settings.
 * This configuration sets up Webpack to handle various build aspects, including file paths,
 * development mode, and API settings.
 *
 * **Paths**:
 * - entry: Defines the path to the main entry file of the application. Set to 'src/index.tsx'.
 * - build: Specifies the directory for build output. Set to 'build'.
 * - html: Path to the HTML template file. Set to 'public/index.html'.
 * - src: Directory for source code. Set to 'src'.
 * - locales: Directory for locale files. Set to 'public/locales'.
 * - buildLocales: Directory for build output of locale files. Set to 'build/locales'.
 *
 * **Mode**:
 * - mode: Specifies the Webpack mode (development or production). Defaults to 'development' if not provided.
 *
 * **Development Port**:
 * - PORT: Defines the port number for the development server. Defaults to 3000 if not provided.
 *
 * **API URL**:
 * - apiUrl: Specifies the base URL for the API. Defaults to 'http://localhost:8000' if not provided.
 *
 * **isDev**:
 * - isDev: A boolean indicating if the build is in development mode. Set to true if mode is 'development'.
 *
 * **Webpack Configuration**:
 * - config: Uses the `buildWebpackConfig` function to generate the Webpack configuration based on the environment
 *   variables and paths, including settings for mode, paths, development flag, port, API URL, and project name.
 *
 * @param {BuildEnv} env - Environment variables for the build process.
 * @returns {webpack.Configuration} The Webpack configuration object for setting up the build environment.
 */

export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    };

    const mode = env?.mode || 'development';
    const PORT = env?.port || 3000;
    const apiUrl = env?.apiUrl || 'http://localhost:8000';

    const isDev = mode === 'development';

    const config: webpack.Configuration = buildWebpackConfig({
        mode,
        paths,
        isDev,
        port: PORT,
        apiUrl,
        project: 'frontend',
    });

    return config;
};
