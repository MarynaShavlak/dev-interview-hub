import React from 'react';
import { VStack } from '@/shared/ui/common/Stack';
import { Icon } from '@/shared/ui/deprecated/Icon';
import EditIcon from '@/shared/assets/icons/edit.svg';
import DeleteIcon from '@/shared/assets/icons/delete.svg';
import cls from '../ArticleBlockPreview.module.scss';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { Card } from '@/shared/ui/deprecated/Card';
import { ArticleBlockPreviewProps } from '../ArticleBlockPreview';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

export const ArticleBlockPreviewDeprecated = <T,>({
    block,
    editBlock,
    deleteBlock,
    BlockComponent,
}: ArticleBlockPreviewProps<T>) => (
    <Card
        className={classNames(
            cls.previewBlockWrapperDeprecated,
            {},
            getFlexClasses({
                hStack: true,
                align: 'start',
                justify: 'between',
            }),
        )}
        max
        // fullHeight
    >
        <BlockComponent block={block} />
        <VStack gap="8" className={cls.previewBlockBtnsWrapperDeprecated}>
            <Button onClick={editBlock} theme={ButtonTheme.CLEAR}>
                <Icon Svg={EditIcon} width={18} />
            </Button>
            <Button onClick={deleteBlock} theme={ButtonTheme.CLEAR}>
                <Icon Svg={DeleteIcon} width={24} />
            </Button>
        </VStack>
    </Card>
);
