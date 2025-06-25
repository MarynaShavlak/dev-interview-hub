import React, { useEffect, useState } from 'react';

import { useHits } from 'react-instantsearch-core';

import cls from './LiveCodeTasksPageContent.module.scss';

import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';

import { NoLiveCodeTasksFound } from '../../NoLiveCodeTasksFound/NoLiveCodeTasksFound';
import { PagePagination } from '@/widgets/PagePagination';
import { LiveCodeList } from '@/entities/LiveCode';
import { transformItems } from '../../../lib/utilities/transformItems/transformItems';
import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';

export const LiveCodeTasksPageContent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { items, hits } = useHits({});

    useEffect(() => {
        if (hits && hits.length > 0) {
            setIsLoading(false);
        }
    }, [hits]);

    const Skeleton = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });
    const pageClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.pageRedesigned,
        off: () => cls.pageDeprecated,
    });

    if (isLoading) {
        return (
            <Skeleton width="100%" height="calc(100vh - 64px)" border="12px" />
        );
    }
    if (items.length === 0) {
        return <NoLiveCodeTasksFound />;
    }

    return (
        <VStack gap="24" justify="between" className={pageClass}>
            <LiveCodeList tasks={transformItems(items)} />
            <PagePagination />
        </VStack>
    );
};
