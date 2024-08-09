import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import defaultImage from '@/shared/assets/images/default-img-list.png';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { renderArticleBlock } from '../renderArticleBlock';

import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../ArticleDetails.module.scss';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { VStack } from '@/shared/ui/redesigned/Stack';
import {
    useArticleDetailsData,
    useArticleDetailsError,
    useArticleDetailsIsLoading,
} from '../../../model/selectors/articleDetails';
import { ArticleDetailsError } from '../ArticleDetailsError/ArticleDetailsError';
import { ArticleDetailsSkeleton } from '../ArticleDetailsSkeleton/ArticleDetailsSkeleton';

export const RedesignedArticleDetails = memo((s) => {
    const { t } = useTranslation('articles');
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
        <VStack gap="16" max className={cls.ArticleDetails}>
            <Text title={article?.title} size="l" bold />
            <Text title={article?.subtitle} />
            <AppImage
                fallback={<Skeleton width="100%" height={420} border="16px" />}
                errorFallback={
                    <AppImage
                        className={cls.img}
                        src={defaultImage}
                        alt={t('Дефолтне зображення картинки статті')}
                    />
                }
                src={article?.img}
                className={cls.img}
            />
            {article?.blocks.map(renderArticleBlock)}
        </VStack>
    );
});
