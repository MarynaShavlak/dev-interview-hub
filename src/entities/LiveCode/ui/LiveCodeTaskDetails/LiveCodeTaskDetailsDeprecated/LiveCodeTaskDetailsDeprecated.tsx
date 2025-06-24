import { memo } from 'react';

import { VStack } from '@/shared/ui/common/Stack';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import cls from '../LiveCodeTaskDetails.module.scss';

import { useLiveCodeDataById } from '../../../api/liveCodeApi';
import { LiveCodeTaskDetailsProps } from '../LiveCodeTaskDetails';
import { LiveCodeTaskDetailsError } from '../LiveCodeTaskDetailsError/LiveCodeTaskDetailsError';
import { LiveCodeTaskDetailsSkeleton } from '../LiveCodeTaskDetailsSkeleton/LiveCodeTaskDetailsSkeleton';
import { renderLiveCodeTaskBlock } from '../renderLiveCodeTaskBlock';

export const LiveCodeTaskDetailsDeprecated = memo(
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

        const { title, blocks } = liveCodeTask;

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
                <VStack gap="4" max>
                    <Text
                        title={title}
                        size={TextSize.L}
                        data-testid="LiveCodeTaskDetails.Title"
                    />
                </VStack>
                {blocks.map(renderLiveCodeTaskBlock)}
            </VStack>
        );
    },
);
