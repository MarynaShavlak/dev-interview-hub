import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { QuestionCardRedesigned } from './QuestionCardRedesigned/QuestionCardRedesigned';
import { QuestionCardDeprecated } from './QuestionCardDeprecated/QuestionCardDeprecated';

export interface QuestionCardProps {
    target?: HTMLAttributeAnchorTarget;
    handleEditClick: () => void;
    handleDeleteClick: () => void;
    index: number;
    text: string;
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
