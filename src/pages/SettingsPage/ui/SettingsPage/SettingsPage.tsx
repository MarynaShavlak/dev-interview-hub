import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { SettingsContainer } from '../SettingsContainer/SettingsContainer';

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = memo((props: SettingsPageProps) => {
    const { className } = props;

    return (
        <Page className={className} data-testid="SettingsPage">
            <SettingsContainer />
        </Page>
    );
});

export default SettingsPage;
