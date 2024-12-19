import React from 'react';
import {
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned/Card';
import { VStack } from '@/shared/ui/common/Stack';
import { Icon } from '@/shared/ui/redesigned/Icon';
import EditIcon from '@/shared/assets/icons/edit.svg';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import cls from '../TextBlockEditor.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';

interface TextBlockPreviewProps {
    textBlock: ArticleTextBlock;
    editTextBlock: () => void;
    deleteTextBlock: () => void;
}

export const TextBlockPreview = ({
    textBlock,
    editTextBlock,
    deleteTextBlock,
}: TextBlockPreviewProps) => (
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
        <ArticleTextBlockComponent block={textBlock} />
        <VStack gap="8" className={cls.previewBlockBtnsWrapper}>
            <Icon clickable Svg={EditIcon} onClick={editTextBlock} width={18} />
            <Icon
                clickable
                Svg={DeleteIcon}
                onClick={deleteTextBlock}
                width={24}
            />
        </VStack>
    </Card>
);
