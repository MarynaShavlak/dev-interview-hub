import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface LiveCodeTasksPageProps {
    className?: string;
}

const LiveCodeTasksPage = memo((props: LiveCodeTasksPageProps) => {
    const { className } = props;

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <main className={className} data-testid="LiveCodeTasksPage">
                    live code tasks
                </main>
            }
            off={
                <Page className={className} data-testid="LiveCodeTasksPage">
                    live code tasks
                </Page>
            }
        />
    );
});

export default LiveCodeTasksPage;
