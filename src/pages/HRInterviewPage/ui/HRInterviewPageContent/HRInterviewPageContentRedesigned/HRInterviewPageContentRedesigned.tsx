import React, { useEffect, useState } from 'react';
import { useHits } from 'react-instantsearch-core';
import cls from '../HRInterviewPageContent.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Accordion } from '@/shared/ui/common/Accordion';

import {
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { NoHRInterviewQAFound } from '../../NoHRInterviewQAFound/NoHRInterviewQAFound';
import { PagePagination } from '@/widgets/PagePagination';

export const HRInterviewPageContentRedesigned = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { items, hits } = useHits({});

    useEffect(() => {
        if (hits && hits.length > 0) {
            setIsLoading(false);
        }
    }, [hits]);

    const mappedItems = items.map((item) => {
        const textBlocks = item.blocks.map((block: ArticleTextBlock) => (
            <ArticleTextBlockComponent
                key={block.id}
                block={block}
                withTags={false}
            />
        ));

        return {
            trigger: <Text text={item.title} className={cls.hrQuestion} />,
            content: <VStack gap="16">{textBlocks}</VStack>,
        };
    });

    if (isLoading) {
        return (
            <Skeleton width="100%" height="calc(100vh - 64px)" border="12px" />
        );
    }
    if (items.length === 0) {
        return <NoHRInterviewQAFound />;
    }

    return (
        <VStack
            gap="24"
            justify="between"
            className={classNames(cls.page, {}, [])}
        >
            <Accordion items={mappedItems} collapsible type="single" />
            <PagePagination />
        </VStack>
    );
};
