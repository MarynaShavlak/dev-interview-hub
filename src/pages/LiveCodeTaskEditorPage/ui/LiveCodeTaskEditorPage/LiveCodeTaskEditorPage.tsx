import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

interface EnglishPageProps {
    className?: string;
}

const LiveCodeTaskEditorPage = memo((props: EnglishPageProps) => {
    const { className } = props;

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <main
                    className={className}
                    data-testid=" LiveCodeTaskEditorPage"
                >
                    edit live code task
                </main>
            }
            off={
                <Page
                    className={className}
                    data-testid=" LiveCodeTaskEditorPage"
                >
                    edit live code task
                </Page>
            }
        />
    );
});

export default LiveCodeTaskEditorPage;
