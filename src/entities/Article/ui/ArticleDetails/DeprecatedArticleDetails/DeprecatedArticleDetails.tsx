import { memo } from 'react';
import { renderArticleBlock } from '../renderArticleBlock';

import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import cls from '../ArticleDetails.module.scss';
import { ArticleDetailsSkeleton } from '../ArticleDetailsSkeleton/ArticleDetailsSkeleton';
import { ArticleDetailsError } from '../ArticleDetailsError/ArticleDetailsError';
import {
    useArticleDetailsData,
    useArticleDetailsError,
    useArticleDetailsIsLoading,
} from '../../../model/selectors/articleDetails';

export const DeprecatedArticleDetails = memo(() => {
    const article = useArticleDetailsData();
    const isLoading = useArticleDetailsIsLoading();
    const error = useArticleDetailsError();

    if (isLoading) {
        return <ArticleDetailsSkeleton />;
    }
    if (error) {
        return <ArticleDetailsError />;
    }
    return (
        <VStack
            gap="16"
            max
            className={cls.ArticleDetails}
            data-testid="ArticleDetails.Info"
        >
            <HStack justify="center" max>
                <Avatar
                    size={200}
                    src={article?.img}
                    className={cls.avatar}
                    data-testid="ArticleDetails.ArticleImage"
                />
            </HStack>
            <VStack gap="4" max>
                <Text
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                    data-testid="ArticleDetails.Title"
                />
                <HStack gap="8">
                    <Icon Svg={EyeIcon} />
                    <Text
                        text={String(article?.views)}
                        data-testid="ArticleDetails.Views"
                    />
                </HStack>
                <HStack gap="8">
                    <Icon Svg={CalendarIcon} />
                    <Text
                        text={article?.createdAt}
                        data-testid="ArticleDetails.CreatedAt"
                    />
                </HStack>
            </VStack>
            {article?.blocks.map(renderArticleBlock)}
        </VStack>
    );
});
