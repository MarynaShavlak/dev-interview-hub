import React from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EditIcon from '@/shared/assets/icons/edit.svg';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import cls from '../ArticleBlockPreview.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleBlockPreviewProps } from '../ArticleBlockPreview';

export const ArticleBlockPreviewRedesigned = <T,>({
    block,
    editBlock,
    deleteBlock,
    BlockComponent,
}: ArticleBlockPreviewProps<T>) => (
    <Card
        className={classNames(
            cls.previewBlockWrapperRedesigned,
            {},
            getFlexClasses({
                hStack: true,
                align: 'start',
                justify: 'between',
            }),
        )}
        customPadding="8px 50px 8px 8px"
        max
        fullHeight
    >
        <BlockComponent block={block} />
        <VStack gap="8" className={cls.previewBlockBtnsWrapperRedesigned}>
            <Icon clickable Svg={EditIcon} onClick={editBlock} width={18} />
            <Icon clickable Svg={DeleteIcon} onClick={deleteBlock} width={24} />
        </VStack>
    </Card>
);
