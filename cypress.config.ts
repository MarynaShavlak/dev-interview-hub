import { defineConfig } from 'cypress';
import admin from 'firebase-admin';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

require('dotenv').config();

// Initialize Firebase Admin SDK (it will use GOOGLE_APPLICATION_CREDENTIALS automatically)
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

// const serviceAccount = await import(
//     process.env['GOOGLE_APPLICATION_CREDENTIALS ']
// );
//
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
// });

export default defineConfig({
    env: {
        apiUrl: 'http://localhost:8000',
    },
    e2e: {
        setupNodeEvents(on, config) {
            return cypressFirebasePlugin(on, config, admin, {
                // Here is where you can pass special options.
                // If you have not set the GCLOUD_PROJECT environment variable, give the projectId here, like so:
                projectId: 'dev-interview-hub',
                // if your databaseURL is not just your projectId plus ".firebaseio.com", then you _must_ give it here, like so:
                //    databaseURL: 'some-project-default-rtdb.europe-west1.firebasedatabase.app',
            });
        },
        baseUrl: 'http://localhost:3000/',
    },

    component: {
        devServer: {
            framework: 'react',
            bundler: 'webpack',
        },
    },
});
