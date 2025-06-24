import React, { memo } from 'react';
import { ArticleCodeBlock } from '../../model/types/article';
import { CodeBlockComponent } from '@/shared/ui/common/CodeBlockComponent';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { className, block } = props;

        return (
            <CodeBlockComponent
                key={block.id}
                title={block.title}
                code={block.code}
                className={className}
            />
        );
    },
);
