import React, { memo } from 'react';
import { Page } from '@/widgets/Page';

import { HRInterviewQAEditorPageContainer } from '../HRInterviewQAEditorPageContainer/HRInterviewQAEditorPageContainer';

interface HRInterviewQAEditorPageProps {
    className?: string;
}

const HRInterviewAnswerEditorPage = memo(
    (props: HRInterviewQAEditorPageProps) => {
        const { className } = props;

        return (
            <Page className={className}>
                <HRInterviewQAEditorPageContainer />
            </Page>
        );
    },
);

export default HRInterviewAnswerEditorPage;
