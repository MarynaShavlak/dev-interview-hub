import { lazy } from 'react';

export const LiveCodeTaskEditorPageAsync = lazy(
    () => import('./LiveCodeTaskEditorPage'),
);
