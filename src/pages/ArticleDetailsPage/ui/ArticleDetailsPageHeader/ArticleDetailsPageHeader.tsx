import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleListButton } from '@/features/ArticleListButton';
import { ArticleEditButton } from '@/features/ArticleEditButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { getCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(
    (props: ArticleDetailsPageHeaderProps) => {
        const { className } = props;
        const canEdit = useSelector(getCanEditArticle);

        return (
            <HStack
                max
                justify="between"
                className={classNames('', {}, [className])}
            >
                <ArticleListButton />
                {canEdit && <ArticleEditButton />}
            </HStack>
        );
    },
);
