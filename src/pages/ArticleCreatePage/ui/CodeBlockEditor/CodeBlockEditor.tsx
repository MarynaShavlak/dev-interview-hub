import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Input } from '@/shared/ui/redesigned/Input';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { HStack, VStack } from '@/shared/ui/common/Stack';

import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import {
    ArticleCodeBlock,
    ArticleCodeBlockComponent,
    ArticleSection,
    ArticleBlockPreview,
} from '@/entities/Article';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { CodeEditor } from '@/shared/ui/redesigned/CodeEditor';
import { useCodeBlockActions } from '../../lib/hooks/useCodeBlockActions/useCodeBlockActions';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useTextInput } from '@/shared/lib/hooks/useTextInput/useTextInput';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { ActionButtonList } from '@/shared/ui/redesigned/ActionButtonList';

interface CodeBlockEditorProps {
    className?: string;
    blockId: string;
    addBlockInArticle: (block: ArticleCodeBlock) => void;
    deleteBlockFromArticle: (id: string) => void;
    onEditBlock?: (block: ArticleCodeBlock) => void;
}

export const CodeBlockEditor = memo((props: CodeBlockEditorProps) => {
    const {
        addBlockInArticle,
        deleteBlockFromArticle,
        blockId,
        onEditBlock,
        className,
    } = props;

    const [code, setCode] = useState<string>('');
    // console.log('value', code);
    const isEmptyContent = code.trim().length === 0;

    const { t } = useTranslation('articleDetails');

    const {
        value: title,
        handleChange: handleTitleChange,
        validConfig,
    } = useTextInput();
    const { isVisible: isBlockSaved, toggleVisibility: toggleBlockSaveState } =
        useToggleVisibility();

    const { saveCodeBlock, deleteCodeBlock } = useCodeBlockActions({
        blockId,
        title,
        code,
        addBlockInArticle,
        onEditBlock,
        deleteBlockFromArticle,
    });

    const { blockTitleErrors } = useFormValidation(
        {
            blockTitle: title,
        },
        validConfig,
        'article',
    );

    const hasInputError = Object.values(blockTitleErrors).some(
        (error) => error,
    );
    const handleSaveCodeBlock = useCallback(() => {
        saveCodeBlock();
        toggleBlockSaveState();
    }, [saveCodeBlock, toggleBlockSaveState]);

    return (
        <>
            {!isBlockSaved ? (
                <VStack gap="16" max>
                    <Input
                        value={title}
                        label={t('Опис коду')}
                        labelBold
                        gap="16"
                        maxWidth={false}
                        className={cls.InputName}
                        onChange={handleTitleChange}
                        validations={validConfig.blockTitle}
                        maxLengthIndicator
                        errors={blockTitleErrors}
                    />
                    <HStack gap="16" align="end" justify="between" max>
                        <CodeEditor
                            height="200px"
                            width="600px"
                            loader={<Skeleton width="100%" height="200px" />}
                            onChangeCode={setCode}
                            initialCode={code}
                        />

                        <ActionButtonList
                            successAction={{
                                label: t('Зберегти'),
                                onClick: handleSaveCodeBlock,
                                icon: AddIcon,
                                disabled: isEmptyContent || hasInputError,
                            }}
                            cancelAction={{
                                label: t('Видалити'),
                                onClick: deleteCodeBlock,
                            }}
                        />
                    </HStack>
                </VStack>
            ) : (
                <ArticleBlockPreview
                    block={{
                        id: blockId,
                        type: ArticleSection.CODE,
                        code,
                        title,
                    }}
                    editBlock={toggleBlockSaveState}
                    deleteBlock={deleteCodeBlock}
                    BlockComponent={ArticleCodeBlockComponent}
                />
            )}
        </>
    );
});
