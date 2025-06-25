import React, { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

import { LiveCodeTasksPageRedesigned } from './LiveCodeTasksPageRedesigned/LiveCodeTasksPageRedesigned';
import { LiveCodeTasksPageDeprecated } from './LiveCodeTasksPageDeprecated/LiveCodeTasksPageDeprecated';

const LiveCodeTasksPage = memo(() => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<LiveCodeTasksPageRedesigned />}
            off={<LiveCodeTasksPageDeprecated />}
        />
    );
});

export default LiveCodeTasksPage;
