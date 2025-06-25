import { HTMLAttributeAnchorTarget, memo } from 'react';

import { LiveCodeListSkeleton } from './LiveCodeListSkeleton/LiveCodeListSkeleton';
import { Each } from '@/shared/lib/components/Each/Each';
import { VStack } from '@/shared/ui/common/Stack';
import { LiveCodeCard } from '../LiveCodeCard/LiveCodeCard';
import { LiveCode } from '../../model/types/liveCode';

export interface LiveCodeListProps {
    className?: string;
    isLoading?: boolean;
    target?: HTMLAttributeAnchorTarget;
    tasks: LiveCode[];
}

export const LiveCodeList = memo((props: LiveCodeListProps) => {
    const { className, isLoading, target, tasks } = props;

    return (
        <VStack gap="16" className={className} max>
            <Each
                of={tasks}
                render={(item) => {
                    return (
                        <LiveCodeCard
                            liveCodeTask={item}
                            target={target}
                            key={item.id}
                        />
                    );
                }}
            />
            {isLoading && <LiveCodeListSkeleton />}
        </VStack>
    );
});
