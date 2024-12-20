import React, { useRef, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';
import { editor } from 'monaco-editor';
import { Input } from '@/shared/ui/redesigned/Input';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { VStack } from '@/shared/ui/common/Stack';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import { CODE_SNIPPETS } from '../../model/consts/codeLanguages';
import { Language } from '../../model/types/language';

type MonacoDiffEditor = editor.IStandaloneDiffEditor;

export const CodeBlockEditor: React.FC = () => {
    const editorRef = useRef();
    const [value, setValue] = useState<string>('');
    const [language, setLanguage] = useState<Language>('javascript');
    const { t } = useTranslation('articleDetails');
    const { theme } = useTheme();
    const codeTheme = theme === Theme.DARK ? 'vs-dark' : 'light';

    const { title, handleTitleChange, validConfig } = useBlockTitle();

    const onMount: OnMount = (editor, monaco) => {
        // @ts-ignore
        editorRef.current = editor;
        editor.focus();
    };

    return (
        <VStack gap="16">
            <Editor
                options={{
                    minimap: {
                        enabled: false,
                    },
                    formatOnType: true,
                }}
                height="75vh"
                theme={codeTheme}
                language={language}
                defaultLanguage="javascript"
                defaultValue={CODE_SNIPPETS[language]}
                onMount={onMount}
                value={value}
                // onChange={(newValue) => setValue(newValue || '')}
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
};
