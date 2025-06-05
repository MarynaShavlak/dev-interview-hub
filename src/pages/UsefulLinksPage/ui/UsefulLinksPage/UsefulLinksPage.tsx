import { memo } from 'react';
import { LinksManager } from '@/features/LinksManager';
import { Page } from '@/widgets/Page';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface UsefulLinksPageProps {
    className?: string;
}

const UsefulLinksPage = memo((props: UsefulLinksPageProps) => {
    const { className } = props;

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <main className={className} data-testid="UsefulLinksPage">
                    <LinksManager />
                </main>
            }
            off={
                <Page className={className} data-testid="UsefulLinksPage">
                    <LinksManager />
                </Page>
            }
        />
    );
});

export default UsefulLinksPage;
