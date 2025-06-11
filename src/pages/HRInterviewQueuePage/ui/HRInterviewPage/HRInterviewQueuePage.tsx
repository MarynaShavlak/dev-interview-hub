import React, { memo } from 'react';

import { QuestionsQueue } from '@/features/QuestionsQueue';

const HRInterviewQueuePage = () => {
    return <QuestionsQueue type="hrInterviewQA" />;
};

export default memo(HRInterviewQueuePage);
