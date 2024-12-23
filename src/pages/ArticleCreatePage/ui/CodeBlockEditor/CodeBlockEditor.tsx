import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/redesigned/Input';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { ArticleCodeBlock } from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { CodeEditor } from '@/shared/ui/redesigned/CodeEditor';
import { useCodeBlockActions } from '../../lib/hooks/useCodeBlockActions/useCodeBlockActions';
import { BlockActionButtonList } from '../BlockActionButtonList/BlockActionButtonList';

interface CodeBlockEditorProps {
    className?: string;
    blockId: string;
    addBlockInArticle: (block: ArticleCodeBlock) => void;
    onDeleteTextBlock: (id: string) => void;
    onEditBlock?: (block: ArticleCodeBlock) => void;
}

export const CodeBlockEditor = memo((props: CodeBlockEditorProps) => {
    const {
        addBlockInArticle,
        onDeleteTextBlock,
        blockId,
        onEditBlock,
        className,
    } = props;

    const [code, setCode] = useState<string>('');
    console.log('value', code);
    const isEmptyContent = code.trim().length === 0;

    const { t } = useTranslation('articleDetails');

    const { title, handleTitleChange, validConfig } = useBlockTitle();
    const { isVisible: isBlockSaved, toggleVisibility: toggleBlockSaveState } =
        useToggleVisibility();

    const { saveCodeBlock, deleteCodeBlock } = useCodeBlockActions({
        blockId,
        description: title,
        code,
        addBlockInArticle,
        onEditBlock,
        onDeleteTextBlock,
    });

    const handleSaveCodeBlock = useCallback(() => {
        saveCodeBlock();
        toggleBlockSaveState();
    }, [saveCodeBlock, toggleBlockSaveState]);

    return (
        <VStack gap="16">
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
            <HStack gap="16" align="end">
                <CodeEditor
                    height="200px"
                    width="500px"
                    loader={<Skeleton width="100%" height="200px" />}
                    onChangeCode={setCode}
                />
                <BlockActionButtonList
                    saveBlock={handleSaveCodeBlock}
                    deleteBlock={deleteCodeBlock}
                    isSaveDisabled={isEmptyContent}
                />
            </HStack>
        </VStack>
    );
});
