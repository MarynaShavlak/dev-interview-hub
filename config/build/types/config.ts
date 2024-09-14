/**
 * Type representing the build modes for the project.
 *
 * @type {'production' | 'development'}
 */
export type BuildMode = 'production' | 'development';


/**
 * Interface representing paths used in the build process.
 *
 * @interface BuildPaths
 * @property {string} entry - Path to the entry point of the application or project.
 * @property {string} build - Destination path where the built output is placed.
 * @property {string} html - Path to the HTML template file(s).
 * @property {string} src - Source directory path containing project source files.
 * @property {string} locales - Path to the directory containing localization files.
 * @property {string} buildLocales - Destination path for built localization files.
 */
export interface BuildPaths {
    entry: string;
    build: string;
    html: string;
    src: string;
    locales: string;
    buildLocales: string;
}

/**
 * Interface representing the environment configuration for the build.
 *
 * @interface BuildEnv
 * @property {BuildMode} mode - The mode of the build (`'production'` or `'development'`).
 * @property {number} port - Port number for the local development server.
 * @property {string} apiUrl - URL of the API endpoint used by the project.
 */
export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
}

/**
 * Interface representing options and configurations for the build process.
 *
 * @interface BuildOptions
 * @property {BuildMode} mode - The mode of the build (`'production'` or `'development'`).
 * @property {BuildPaths} paths - Object containing paths relevant to the build process.
 * @property {boolean} isDev - Boolean indicating whether the build is in development mode.
 * @property {number} port - Port number for the local development server.
 * @property {string} apiUrl - URL of the API endpoint used by the project.
 * @property {'storybook' | 'frontend' | 'jest'} project - Specifies the type of project (`'storybook'`, `'frontend'`, or `'jest'`).
 */
export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths;
    isDev: boolean;
    port: number;
    apiUrl: string;
    project: 'storybook' | 'frontend' | 'jest';
}
