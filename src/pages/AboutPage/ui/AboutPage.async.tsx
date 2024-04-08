import { lazy } from 'react';

// @ts-ignore
// export const AboutPageAsync = lazy(() => import('./AboutPage'));

export const AboutPageAsync = lazy(() => new Promise((resolve) => {
    // ТАК В РЕАЛЬНЫХ ПРОЕКТАХ НЕ ДЕЛАТЬ!!!!!
    // @ts-ignore
    setTimeout(() => resolve(import('./AboutPage')), 1500);
}));
