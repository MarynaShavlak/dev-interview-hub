import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { SettingsContainer } from '../SettingsContainer/SettingsContainer';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <main className={className} data-testid="SettingsPage">
                    <SettingsContainer />
                </main>
            }
            off={
                <Page className={className} data-testid="SettingsPage">
                    <SettingsContainer />
                </Page>
            }
        />
    );
});

export default SettingsPage;
