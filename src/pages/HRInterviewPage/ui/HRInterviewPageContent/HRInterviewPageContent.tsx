import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-instantsearch';

import { useHits } from 'react-instantsearch-core';

import cls from '../HRInterviewPage/HRInterviewPage.module.scss';

import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Text } from '@/shared/ui/redesigned/Text';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Accordion } from '@/shared/ui/common/Accordion';
import { NoHRInterviewQAFound } from '../NoHRInterviewQAFound/NoHRInterviewQAFound';
import {
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';

export const HRInterviewPageContent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { items, results, hits } = useHits({});

    let page = 0;
    if (results) {
        page = results.page;
    }

    useEffect(() => {
        if (hits && hits.length > 0) {
            setIsLoading(false);
        }
    }, [hits]);

    // const mappedItems = items.map((item) => {
    //     console.log('item', item);
    //     const block: ArticleTextBlock = {
    //         id: item.id,
    //         type: SectionType.TEXT,
    //         paragraphs: item.blocks[0].paragraphs,
    //     };
    //     return {
    //         trigger: item.title,
    //         content: (
    //             <ArticleTextBlockComponent block={block} withTags={false} />
    //         ),
    //     };
    // });
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
            className={classNames(cls.pageRedesigned, {}, [])}
        >
            <Accordion items={mappedItems} collapsible type="single" />

            <Pagination
                classNames={{
                    list: cls.pagList,
                    root: cls.pagWrap,
                    item: cls.pagItem,
                    selectedItem: cls.pagSelectedItem,
                    link: cls.pagLink,
                    disabledItem: cls.pagDisabledItem,
                }}
            />
        </VStack>
    );
};
