import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { PageLoader } from '@/widgets/PageLoader';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

export const AppLoader = () => {
    const { theme } = useTheme();
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <div
                    id="app"
                    className={classNames('app_redesigned', {}, [theme])}
                >
                    <AppLoaderLayout />
                </div>
            }
            off={
                <div id="app" className={classNames('app', {}, [theme])}>
                    <PageLoader />
                </div>
            }
        />
    );
};
