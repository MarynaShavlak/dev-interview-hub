import React from 'react';

import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { ArticleBlockPreviewDeprecated } from './ArticleBlockPreviewDeprecated/ArticleBlockPreviewDeprecated';
import { ArticleBlockPreviewRedesigned } from './ArticleBlockPreviewRedesigned/ArticleBlockPreviewRedesigned';

export interface ArticleBlockPreviewProps<T> {
    block: T;
    editBlock: () => void;
    deleteBlock: () => void;
    BlockComponent: React.ComponentType<{ block: T }>;
}

export const ArticleBlockPreview = <T,>(props: ArticleBlockPreviewProps<T>) => (
    <ToggleFeaturesComponent
        feature="isAppRedesigned"
        on={<ArticleBlockPreviewRedesigned {...props} />}
        off={<ArticleBlockPreviewDeprecated {...props} />}
    />
);
