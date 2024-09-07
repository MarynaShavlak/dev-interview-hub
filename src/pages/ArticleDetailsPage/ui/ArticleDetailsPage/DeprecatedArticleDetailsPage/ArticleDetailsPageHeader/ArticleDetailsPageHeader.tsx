import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleListNavigationButton } from '@/features/ArticleListNavigationButton';
import { ArticleEditNavigationButton } from '@/features/ArticleEditNavigationButton';
import { HStack } from '@/shared/ui/common/Stack';
import { getCanEditArticle } from '../../../../model/selectors/getCanEditArticle/getCanEditArticle';

interface ArticleDetailsPageHeaderProps {
    className?: string;
}

export const ArticleDetailsPageHeader = memo(
    (props: ArticleDetailsPageHeaderProps) => {
        const { className } = props;
        const canEdit = useSelector(getCanEditArticle);

        return (
            <HStack max justify="between" className={className}>
                <ArticleListNavigationButton />
                {canEdit && <ArticleEditNavigationButton />}
            </HStack>
        );
    },
);
