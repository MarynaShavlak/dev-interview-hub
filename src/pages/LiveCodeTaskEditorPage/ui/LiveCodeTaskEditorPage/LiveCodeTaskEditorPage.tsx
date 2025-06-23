import React, { memo } from 'react';
import { Page } from '@/widgets/Page';
import { LiveCodeEditorPageContainer } from '../LiveCodeEditorPageContainer/LiveCodeEditorPageContainer';

interface EnglishPageProps {
    className?: string;
}

const LiveCodeTaskEditorPage = memo((props: EnglishPageProps) => {
    const { className } = props;

    return (
        <Page className={className} data-testid="LiveCodeTaskEditorPage">
            <LiveCodeEditorPageContainer />
        </Page>
    );
});

export default LiveCodeTaskEditorPage;
