import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/redesigned/Input';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { VStack } from '@/shared/ui/common/Stack';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleTextBlock } from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { CodeEditor } from '@/shared/ui/redesigned/CodeEditor';

interface CodeBlockEditorProps {
    className?: string;
    blockId: string;
    addBlockInArticle: (block: ArticleTextBlock) => void;
    onDeleteTextBlock: (id: string) => void;
    onEditBlock?: (block: ArticleTextBlock) => void;
}

export const CodeBlockEditor = memo((props: CodeBlockEditorProps) => {
    const {
        addBlockInArticle,
        onDeleteTextBlock,
        blockId,
        onEditBlock,
        className,
    } = props;

    const [value, setValue] = useState<string>('');
    console.log('value', value);

    const { t } = useTranslation('articleDetails');

    const { title, handleTitleChange, validConfig } = useBlockTitle();
    const { isVisible: isBlockSaved, toggleVisibility: toggleBlockSaveState } =
        useToggleVisibility();

    return (
        <VStack gap="16">
            <CodeEditor
                height="200px"
                width="500px"
                loader={<Skeleton width="100%" height="200px" />}
                // onChange={(newValue: string) => setValue(newValue || '')}
            />

            <Input
                value={title}
                label={t('Опис коду')}
                labelBold
                gap="16"
                maxWidth={false}
                className={cls.InputName}
                onChange={handleTitleChange}
                validations={validConfig.title}
                maxLengthIndicator
            />
        </VStack>
    );
});
