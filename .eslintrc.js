module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'ms-production-project-plugin',
        'toggle-features-rule-plugin',
        'unused-imports',
    ],
    rules: {
        'unused-imports/no-unused-imports': 'error',
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.tsx'] },
        ],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'to',
                    'target',
                    'direction',
                    'justify',
                    'align',
                    'gap',
                    'role',
                    'as',
                    'border',
                    'feature',
                    'color',
                    'variant',
                    'size',
                    'wrap',
                    'legendPosition',
                    'color',
                    'dateFormat',
                    'wrapperClassName',
                    'defaultLanguage',
                    'attribute',
                    'padding',
                    'customPadding',
                ],
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 150 }],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies,
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'linebreak-style': 'off',
        'react/no-array-index-key': 'off',
        'arrow-body-style': 'off',
        'ms-production-project-plugin/path-checker': ['error', { alias: '@' }],
        'ms-production-project-plugin/layer-imports': [
            'error',
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
        'ms-production-project-plugin/public-api-imports': [
            'error',
            {
                alias: '@',
                testFilesPatterns: [
                    '**/*.test.*',
                    '**/*.testing.ts',
                    '**/*.story.*',
                    '**/*.stories.tsx',
                    '**/StoreDecorator.tsx',
                ],
            },
        ],
        'toggle-features-rule-plugin/one-line-arrow-function': ['error'],
        'toggle-features-rule-plugin/component-jsx-props': ['error'],
        'react/jsx-max-props-per-line': ['error', { maximum: 5 }],
        'no-console': 'off',
        'no-alert': 'off',
        'jsx-a11y/ label-has-associated-control': 'off',
        'jsx-props-no-spreading': 'off',
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
        __FIREBASE_API_KEY__: true,
        __FIREBASE_AUTH_DOMAIN__: true,
        __FIREBASE_PROJECT_ID__: true,
        __FIREBASE_STORAGE_BUCKET__: true,
        __FIREBASE_MESSAGING_SENDER_ID__: true,
        __FIREBASE_APP_ID__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
                'max-len': 'off',
            },
        },
    ],
};
