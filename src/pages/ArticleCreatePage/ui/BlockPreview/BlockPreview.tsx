import React from 'react';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/common/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EditIcon from '@/shared/assets/icons/edit.svg';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import cls from './BlockPreview.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

interface BlockPreviewProps<T> {
    block: T;
    editBlock: () => void;
    deleteBlock: () => void;
    BlockComponent: React.ComponentType<{ block: T }>;
}

export const BlockPreview = <T,>({
    block,
    editBlock,
    deleteBlock,
    BlockComponent,
}: BlockPreviewProps<T>) => (
    <Card
        className={classNames(
            cls.previewBlockWrapper,
            {},
            getFlexClasses({
                hStack: true,
                align: 'start',
                justify: 'between',
            }),
        )}
        max
        fullHeight
    >
        <BlockComponent block={block} />
        <VStack gap="8" className={cls.previewBlockBtnsWrapper}>
            <Icon clickable Svg={EditIcon} onClick={editBlock} width={18} />
            <Icon clickable Svg={DeleteIcon} onClick={deleteBlock} width={24} />
        </VStack>
    </Card>
);
