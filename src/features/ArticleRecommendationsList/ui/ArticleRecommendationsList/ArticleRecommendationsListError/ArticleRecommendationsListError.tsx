import React, { memo } from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import {
    Text as TextDeprecated,
    TextSize,
    TextTheme,
} from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';

export interface ArticleRecommendationsListErrorProps {
    errorTitle: string;
    errorText: string;
}

export const ArticleRecommendationsListError = memo(
    (props: ArticleRecommendationsListErrorProps) => {
        const { errorTitle, errorText } = props;

        return (
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <Text
                        size="l"
                        title={errorTitle}
                        text={errorText}
                        variant="error"
                    />
                }
                off={
                    <TextDeprecated
                        size={TextSize.L}
                        title={errorTitle}
                        text={errorText}
                        theme={TextTheme.ERROR}
                    />
                }
            />
        );
    },
);
