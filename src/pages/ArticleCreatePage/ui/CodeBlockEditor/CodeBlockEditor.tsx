import React, { useRef, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import { useTranslation } from 'react-i18next';
import * as monaco from 'monaco-editor';
import { Input } from '@/shared/ui/redesigned/Input';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { VStack } from '@/shared/ui/common/Stack';
import { useBlockTitle } from '../../lib/hooks/useBlockTitle/useBlockTitle';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import {
    CODE_SNIPPETS,
    LANGUAGE_VERSIONS,
} from '../../model/consts/codeLanguages';
import { Language } from '../../model/types/language';
import { ListBox } from '@/shared/ui/redesigned/Popups';

export const CodeBlockEditor: React.FC = () => {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [value, setValue] = useState<string>('');
    console.log('value', value);
    const [language, setLanguage] = useState<Language>('javascript');
    const { t } = useTranslation('articleDetails');
    const { theme } = useTheme();
    const codeTheme = theme === Theme.DARK ? 'vs-dark' : 'light';

    const { title, handleTitleChange, validConfig } = useBlockTitle();

    const onMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        editor.focus();
    };

    const onSelectLanguage = (language: Language) => {
        setLanguage(language);
        setValue(CODE_SNIPPETS[language]);
    };

    const languageOptions = Object.keys(LANGUAGE_VERSIONS).map((key) => ({
        value: key,
        label: key,
    }));
    return (
        <VStack gap="16">
            <ListBox
                value={language}
                defaultValue="javascript"
                items={languageOptions}
                onChange={onSelectLanguage}
                direction="bottom right"
            />
            <Editor
                options={{
                    minimap: {
                        enabled: false,
                    },
                    formatOnType: true,
                }}
                height="200px"
                width="100%"
                theme={codeTheme}
                language={language}
                defaultLanguage={CODE_SNIPPETS.javascript}
                defaultValue={CODE_SNIPPETS[language]}
                onMount={onMount}
                value={value}
                onChange={(newValue) => setValue(newValue || '')}
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
