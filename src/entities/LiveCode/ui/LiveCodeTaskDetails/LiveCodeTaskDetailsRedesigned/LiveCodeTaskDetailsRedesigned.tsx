import { memo } from 'react';

import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../LiveCodeTaskDetails.module.scss';
import { VStack } from '@/shared/ui/common/Stack';

import { LiveCodeTaskDetailsProps } from '../LiveCodeTaskDetails';
import { LiveCodeTaskDetailsSkeleton } from '../LiveCodeTaskDetailsSkeleton/LiveCodeTaskDetailsSkeleton';
import { LiveCodeTaskDetailsError } from '../LiveCodeTaskDetailsError/LiveCodeTaskDetailsError';
import { useLiveCodeDataById } from '../../../api/liveCodeApi';
import { renderLiveCodeTaskBlock } from '../renderLiveCodeTaskBlock';

export const LiveCodeTaskDetailsRedesigned = memo(
    (props: LiveCodeTaskDetailsProps) => {
        const { id } = props;

        const {
            data: liveCodeTask,
            isLoading,
            error,
        } = useLiveCodeDataById(id || '');

        if (!liveCodeTask) {
            return null;
        }
        const { title, blocks, createdAt } = liveCodeTask;

        if (isLoading) {
            return <LiveCodeTaskDetailsSkeleton />;
        }

        if (error) {
            return <LiveCodeTaskDetailsError />;
        }

        return (
            <VStack
                gap="16"
                max
                className={cls.LiveCodeTaskDetails}
                data-testid="LiveCodeTaskDetails.Info"
            >
                <Text
                    title={title}
                    size="l"
                    bold
                    data-testid="LiveCodeTaskDetails.Title"
                />

                {blocks.map(renderLiveCodeTaskBlock)}
            </VStack>
        );
    },
);
