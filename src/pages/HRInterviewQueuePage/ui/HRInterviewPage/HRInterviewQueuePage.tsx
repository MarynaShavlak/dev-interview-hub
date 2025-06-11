import React, { memo } from 'react';

import { QuestionsQueue } from '@/features/QuestionsQueue';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Page } from '@/widgets/Page';

const HRInterviewQueuePage = () => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<QuestionsQueue type="hrInterviewQA" />}
            off={
                <Page>
                    <QuestionsQueue type="hrInterviewQA" />
                </Page>
            }
        />
    );
};

export default memo(HRInterviewQueuePage);
