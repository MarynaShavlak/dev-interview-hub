import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

export interface EmptyArticleRecommendationsListProps {
    noRecommendsTitle: string;
    noRecommendsText: string;
}

export const EmptyArticleRecommendationsList = memo(
    (props: EmptyArticleRecommendationsListProps) => {
        const { noRecommendsText, noRecommendsTitle } = props;

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Text
                        size="l"
                        title={noRecommendsTitle}
                        text={noRecommendsText}
                        variant="error"
                    />
                }
                off={
                    <TextDeprecated
                        size={TextSize.L}
                        title={noRecommendsTitle}
                        text={noRecommendsText}
                        theme={TextTheme.ERROR}
                    />
                }
            />
        );
    },
);
