import { memo } from 'react';
import { LiveCodeTaskDetailsPageRedesigned } from './LiveCodeTaskDetailsPageRedesigned/LiveCodeTaskDetailsPageRedesigned';
import { LiveCodeTaskDetailsPageDeprecated } from './LiveCodeTaskDetailsPageDeprecated/LiveCodeTaskDetailsPageDeprecated';
import { ToggleFeaturesComponent } from '@/shared/lib/features';

export interface LiveCodeTaskDetailsPageProps {
    className?: string;
}

const LiveCodeTaskDetailsPage = ({
    className,
}: LiveCodeTaskDetailsPageProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<LiveCodeTaskDetailsPageRedesigned className={className} />}
            off={<LiveCodeTaskDetailsPageDeprecated className={className} />}
        />
    );
};

export default memo(LiveCodeTaskDetailsPage);
