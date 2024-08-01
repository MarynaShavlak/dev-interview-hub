import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleListNavigationButton } from '@/features/ArticleListNavigationButton';
import { ArticleEditNavigationButton } from '@/features/ArticleEditNavigationButton';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
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
                <ArticleListNavigationButton />
                {canEdit && <ArticleEditNavigationButton />}
            </HStack>
        );
    },
);
