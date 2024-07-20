import { memo } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/redesigned/Code';
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code';
import cls from './ArticleCodeBlockComponent.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComponentProps {
    className?: string;
    block: ArticleCodeBlock;
}

export const ArticleCodeBlockComponent = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { className, block } = props;

        return (
            <div
                className={classNames(cls.ArticleCodeBlockComponent, {}, [
                    className,
                ])}
            >
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Code text={block.code} />}
                    off={<CodeDeprecated text={block.code} />}
                />
            </div>
        );
    },
);
