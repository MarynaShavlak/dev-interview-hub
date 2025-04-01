import React, { memo, ReactNode, useRef, useState } from 'react';
import { Editor, OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useTranslation } from 'react-i18next';
import { VStack } from '../Stack';
import { ListBox as ListBoxRedesigned } from '../../redesigned/Popups';
import { ListBox as ListBoxDeprecated } from '../../deprecated/Popups';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { Theme } from '@/shared/const/theme';
import { toggleFeatures } from '@/shared/lib/features';

export interface CodeEditorProps {
    className?: string;
    height?: string;
    width?: string;
    initialCode?: string;
    initialLanguage?: string;

    loader: ReactNode;
    onChangeCode?: (code: string) => void;
    // onChangeLanguage?: (language: string) => void;
}

export type Language =
    | 'javascript'
    | 'typescript'
    | 'python'
    | 'java'
    | 'csharp'
    | 'php'
    | 'html'
    | 'css'
    | 'scss'
    | 'markdown';

const LANGUAGE_VERSIONS: Record<Language, string> = {
    javascript: '18.15.0',
    typescript: '5.0.3',
    python: '3.10.0',
    java: '15.0.2',
    csharp: '6.12.0',
    php: '8.2.3',
    html: '5.0.0',
    css: '3.0.0',
    scss: '1.62.1',
    markdown: '6.0.0',
};

export const CodeEditor = memo((props: CodeEditorProps) => {
    const {
        className,
        initialCode = '',
        height = '200px',
        width = '100%',
        initialLanguage = 'javascript',
        loader,
        onChangeCode,
        // onChangeLanguage,
    } = props;
    const { t } = useTranslation();
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [code, setCode] = useState<string>(initialCode);
    const [language, setLanguage] = useState<string>(initialLanguage);

    const { theme } = useTheme();
    const codeTheme = theme === Theme.DARK ? 'vs-dark' : 'light';

    const handleMount: OnMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    };

    const handleLanguageChange = (language: string) => {
        setLanguage(language);
    };

    const handleCodeChange = (newCode: string | undefined) => {
        const updatedCode = newCode || '';
        setCode(updatedCode);
        onChangeCode?.(updatedCode);
    };

    const languageOptions = Object.keys(LANGUAGE_VERSIONS).map((key) => ({
        value: key,
        label: key,
    }));
    const ListBox = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => ListBoxRedesigned,
        off: () => ListBoxDeprecated,
    });

    return (
        <VStack gap="16" className={className}>
            <ListBox
                value={language}
                defaultValue={t('javascript')}
                items={languageOptions}
                onChange={handleLanguageChange}
                direction="bottom right"
            />
            <Editor
                options={{
                    minimap: { enabled: false },
                    formatOnType: true,
                }}
                height={height}
                width={width}
                theme={codeTheme}
                language={language}
                defaultLanguage="javascript"
                value={code}
                onMount={handleMount}
                loading={loader}
                onChange={handleCodeChange}
            />
        </VStack>
    );
});
