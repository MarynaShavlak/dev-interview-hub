import React, { useEffect } from 'react';
import { initAuthData, useUserInited } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLoader } from './components/AppLoader/AppLoader';
import { AppContent } from './components/AppContent/AppContent';

function App() {
    const inited = useUserInited();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!inited) {
            dispatch(initAuthData());
        }
    }, [dispatch, inited]);

    return !inited ? <AppLoader /> : <AppContent />;
}

export default App;
