import React from 'react';
import { Pagination } from 'react-instantsearch';

import cls from './PagePagination.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

export const PagePagination = () => {
    const itemClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.pagItemRedesigned,
        off: () => cls.pagItemDeprecated,
    });
    const selectedItemClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.pagSelectedItemRedesigned,
        off: () => cls.pagSelectedItemDeprecated,
    });
    return (
        <Pagination
            classNames={{
                list: cls.pagList,
                root: cls.pagWrap,
                item: itemClass,
                selectedItem: selectedItemClass,
                link: cls.pagLink,
                disabledItem: cls.pagDisabledItem,
            }}
        />
    );
};
