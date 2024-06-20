import React, { Suspense, useEffect } from 'react';
import { AppRouter } from './providers/router';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { useUserActions, useUserInited } from '@/entities/User';

function App() {
    const { theme } = useTheme();
    const inited = useUserInited();
    const { initAuthData } = useUserActions();

    useEffect(() => {
        initAuthData();
    }, [initAuthData]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
