import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Question } from '../..';
import { EditQuestionFormRedesigned } from './EditQuestionFormRedesigned/EditQuestionFormRedesigned';
import { EditQuestionFormDeprecated } from './EditQuestionFormDeprecated/EditQuestionFormDeprecated';

export interface EditQuestionFormProps {
    question: Question;
    onCancel: () => void;
    onSave: (updatedQuestion: Question) => void;
}

export const EditQuestionForm = memo((props: EditQuestionFormProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<EditQuestionFormRedesigned {...props} />}
            off={<EditQuestionFormDeprecated {...props} />}
        />
    );
});
