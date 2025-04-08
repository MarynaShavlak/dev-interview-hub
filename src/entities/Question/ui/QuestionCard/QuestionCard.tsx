import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { QuestionCardRedesigned } from './QuestionCardRedesigned/QuestionCardRedesigned';
import { QuestionCardDeprecated } from './QuestionCardDeprecated/QuestionCardDeprecated';
import { Question } from '../../model/types/question';

export interface QuestionCardProps {
    target?: HTMLAttributeAnchorTarget;
    handleEditClick: (title: string) => void;
    deleteQuestion: (questionId: string) => Promise<any>;
    index: number;
    question: Question;
}

export const QuestionCard = memo((props: QuestionCardProps) => {
    return (
        <ToggleFeaturesComponent
            feature="isAppRedesigned"
            on={<QuestionCardRedesigned {...props} />}
            off={<QuestionCardDeprecated {...props} />}
        />
    );
});
