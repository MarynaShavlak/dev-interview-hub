import React, { Suspense } from 'react';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Sidebar } from '@/widgets/Sidebar';
import { useAppToolbar } from '../../lib/useAppToolbar/useAppToolbar';
import { AppRouter } from '../../providers/router';

export const AppContent = () => {
    const { theme } = useTheme();
    const toolbar = useAppToolbar();

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <div
                    id="app"
                    className={classNames('app_redesigned', {}, [theme])}
                >
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            }
            off={
                <div id="app" className={classNames('app', {}, [theme])}>
                    <Suspense fallback="">
                        <Navbar />
                        <div className="content-page">
                            <Sidebar />
                            <AppRouter />
                        </div>
                    </Suspense>
                </div>
            }
        />
    );
};
