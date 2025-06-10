import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-instantsearch';

import { useHits } from 'react-instantsearch-core';

import cls from '../HRInterviewPage/HRInterviewPage.module.scss';

import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { VStack } from '@/shared/ui/common/Stack';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Accordion } from '@/shared/ui/common/Accordion';

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

    // const articlesToRender = transformItems(items);
    const mappedItems = items.map((item) => {
        return {
            trigger: item.title,
            content: item.blocks.join(', '),
        };
    });

    if (isLoading) {
        return (
            <Skeleton width="100%" height="calc(100vh - 64px)" border="12px" />
        );
    }
    // if (articlesToRender.length === 0) {
    //     return <NoArticlesFound />;
    // }

    return (
        <VStack
            gap="24"
            justify="between"
            className={classNames(cls.ArticlesPageRedesigned, {}, [])}
            data-testid="ArticlesPage"
        >
            <Accordion items={mappedItems} collapsible type="single" />
            {/* <ArticleList */}
            {/*    view={view} */}
            {/*    page={page} */}
            {/*    articlesToRender={articlesToRender} */}
            {/* /> */}
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
