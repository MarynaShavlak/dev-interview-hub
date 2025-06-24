import React, { memo } from 'react';
import { ArticleTextBlock } from '../../model/types/article';
import { TextBlockComponent } from '@/shared/ui/common/TextBlockComponent';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
    withTags?: boolean;
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const { className, block, withTags = false } = props;

        return (
            <TextBlockComponent
                key={block.id}
                title={block.title}
                paragraphs={block.paragraphs}
                withTags={withTags}
                className={className}
            />
        );
    },
);
