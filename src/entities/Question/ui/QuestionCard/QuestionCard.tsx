import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { QuestionCardRedesigned } from './QuestionCardRedesigned/QuestionCardRedesigned';
import { QuestionCardDeprecated } from './QuestionCardDeprecated/QuestionCardDeprecated';
import { Question } from '../../model/types/question';
import { EntityType } from '@/shared/types/entityType';

export interface QuestionCardProps {
    target?: HTMLAttributeAnchorTarget;
    createEntity: (updatedQuestion: Question) => Promise<any>;
    deleteQuestion: (questionId: string) => Promise<any>;
    updateQuestion: (updatedQuestion: Question) => Promise<any>;
    index: number;
    question: Question;
    type: EntityType;
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
