import { memo, useCallback } from 'react';
import { Page } from '@/widgets/Page';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { VocabularyManager } from '@/widgets/VocabularyManager';

interface EnglishPageProps {
    className?: string;
}

const EnglishPage = memo((props: EnglishPageProps) => {
    const { className } = props;
    const onAddVocabulary = useCallback(
        (text: string, meaning: string, translation: string) => {
            // dispatch(addLinkThunk({ text, label }));
            console.log(text, meaning, translation);
        },
        [],
    );

    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={
                <main className={className} data-testid="EnglishPage">
                    <VocabularyManager />
                </main>
            }
            off={
                <Page className={className} data-testid="EnglishPage">
                    page
                </Page>
            }
        />
    );
});

export default EnglishPage;
