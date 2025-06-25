import React, { useEffect, useState } from 'react';

import { useHits } from 'react-instantsearch-core';

import cls from './LiveCodeTasksPageContent.module.scss';

import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

import { NoLiveCodeTasksFound } from '../../NoLiveCodeTasksFound/NoLiveCodeTasksFound';
import { PagePagination } from '@/widgets/PagePagination';
import { LiveCodeList } from '@/entities/LiveCode';
import { transformItems } from '../../../lib/utilities/transformItems/transformItems';

export const LiveCodeTasksPageContent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { items, hits } = useHits({});

    useEffect(() => {
        if (hits && hits.length > 0) {
            setIsLoading(false);
        }
    }, [hits]);

    if (isLoading) {
        return (
            <Skeleton width="100%" height="calc(100vh - 64px)" border="12px" />
        );
    }
    if (items.length === 0) {
        return <NoLiveCodeTasksFound />;
    }

    return (
        <VStack
            gap="24"
            justify="between"
            className={classNames(cls.page, {}, [])}
        >
            <LiveCodeList tasks={transformItems(items)} />
            <PagePagination />
        </VStack>
    );
};
