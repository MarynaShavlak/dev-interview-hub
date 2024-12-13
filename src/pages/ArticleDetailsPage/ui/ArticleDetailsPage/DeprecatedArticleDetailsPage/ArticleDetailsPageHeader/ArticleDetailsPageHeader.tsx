import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticleListNavigationButton } from '@/features/ArticleListNavigationButton';
import { ArticleEditNavigationButton } from '@/features/ArticleEditNavigationButton';
import { HStack } from '@/shared/ui/common/Stack';
import { getCanEditArticle } from '../../../../model/selectors/getCanEditArticle/getCanEditArticle';

interface ArticleDetailsPageHeaderProps {
    className?: string;
    id: string;
}

export const ArticleDetailsPageHeader = memo(
    (props: ArticleDetailsPageHeaderProps) => {
        const { className, id } = props;
        const canEdit = useSelector(getCanEditArticle(id));
        console.log('canEdit', canEdit);

        return (
            <HStack max justify="between" className={className}>
                <ArticleListNavigationButton />
                {canEdit && <ArticleEditNavigationButton id={id} />}
            </HStack>
        );
    },
);
