import { Workbox } from 'workbox-window';

export default function registerServiceWorker() {
    console.log(
        'Attempting to register service worker, environment:',
        process.env.NODE_ENV,
    );

    if (
        process.env.NODE_ENV !== 'production' &&
        process.env.mode !== 'production'
    ) {
        console.log('Not in production, skipping service worker registration');
        return;
    }

    // Check if the serviceWorker Object exists in the navigator object
    if ('serviceWorker' in navigator) {
        console.log('Service Worker is supported by this browser');
        const wb = new Workbox('./sw.js');

        // wb.addEventListener('installed', (event) => {
        //     console.log(
        //         'Service worker installed',
        //         event.isUpdate ? '(update)' : '(first install)',
        //     );
        //     if (event.isUpdate) {
        //         if (
        //             confirm(`New app update is available! Click OK to refresh`)
        //         ) {
        //             window.location.reload();
        //         }
        //     }
        // });

        // wb.addEventListener('activated', () => {
        //     console.log('Service worker activated');
        // });
        //
        // wb.addEventListener('waiting', () => {
        //     console.log('Service worker waiting');
        // });

        wb.register()
            .then((registration) => {
                // console.log(
                //     'Service Worker registered with scope:',
                //     registration.scope,
                // );
            })
            .catch((error) => {
                // console.error('Service Worker registration failed:', error);
            });
    } else {
        // console.log('Service Worker is not supported by this browser');
    }
}
