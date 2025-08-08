import React, { Suspense } from 'react';
import { isMobile } from 'react-device-detect';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { MobileNavbar, Navbar } from '@/widgets/Navbar';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { MobileSidebar, Sidebar } from '@/widgets/Sidebar';
import { useAppToolbar } from '../../lib/useAppToolbar/useAppToolbar';
import { AppRouter } from '../../providers/router';
import { MobileLayout } from '@/shared/layouts/MobileLayout/MobileLayout';
import { MobileMenu } from '@/widgets/MobileMenu';

export const AppContent = () => {
    const { theme } = useTheme();
    const toolbar = useAppToolbar();
    if (isMobile) {
        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <div
                        id="app"
                        className={classNames('app_redesigned', {}, [theme])}
                    >
                        <Suspense fallback="">
                            <MobileLayout
                                navbar={<MobileNavbar />}
                                content={<AppRouter />}
                                rightbar={
                                    <MobileMenu menu={<MobileSidebar />} />
                                }

                                // toolbar={toolbar}
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
    }

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
