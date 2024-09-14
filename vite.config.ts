import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

/**
 * Vite configuration for a React project with SVG support.
 * This configuration sets up Vite to handle React and SVG files efficiently,
 * and includes environment-specific definitions for the project.
 *
 * **Plugins**:
 * - `svgr`: Enables importing SVG files as React components. The `exportAsDefault: true` option makes SVGs default exports.
 * - `react`: Provides React-specific optimizations and features for Vite.
 *
 * **Resolve**:
 * - `alias`: Configures path aliases, in this case mapping `'@'` to the `/src` directory for simplified imports.
 *
 * **Define**:
 * - `__IS_DEV__`: Defines a constant for indicating the development environment. Set to `true`.
 * - `__API__`: Defines a constant for the base API URL. Set to `'http://localhost:8000'`.
 * - `__PROJECT__`: Defines a constant for the project name. Set to `'frontend'`.
 *
 * @returns The Vite configuration object for setting up the build and development environment.
 */

export default defineConfig({
    plugins: [svgr({ exportAsDefault: true }), react()],
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    define: {
        __IS_DEV__: JSON.stringify(true),
        __API__: JSON.stringify('http://localhost:8000'),
        __PROJECT__: JSON.stringify('frontend'),
    },
});
