import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { EditVocabularyFormRedesigned } from './EditVocabularyFormRedesigned/EditVocabularyFormRedesigned';
import { EditVocabularyFormDeprecated } from './EditVocabularyFormDeprecated/EditVocabularyFormDeprecated';
import { Vocabulary } from '../../model/types/vocabulary';

export interface EditVocabularyFormProps {
    vocabulary: Vocabulary;
    onCancel: () => void;
    onSave: (updatedVocabulary: Vocabulary) => void;
}

export const EditVocabularyForm = memo((props: EditVocabularyFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<EditVocabularyFormRedesigned {...props} />}
            off={<EditVocabularyFormDeprecated {...props} />}
        />
    );
});
