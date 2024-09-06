import { defineConfig } from 'cypress';

export default defineConfig({
    env: {
        apiUrl: 'http://localhost:8000',
    },
    e2e: {
        setupNodeEvents(on, config) {},
        baseUrl: 'http://localhost:3000/',
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },
});
