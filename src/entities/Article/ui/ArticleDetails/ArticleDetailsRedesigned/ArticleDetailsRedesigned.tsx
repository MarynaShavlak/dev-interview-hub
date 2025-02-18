import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import defaultImage from '@/shared/assets/images/default-img-list.png';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { renderArticleBlock } from '../renderArticleBlock';

import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../ArticleDetails.module.scss';
import { AppImage } from '@/shared/ui/common/AppImage';
import { VStack } from '@/shared/ui/common/Stack';

import { ArticleDetailsError } from '../ArticleDetailsError/ArticleDetailsError';
import { ArticleDetailsSkeleton } from '../ArticleDetailsSkeleton/ArticleDetailsSkeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { ArticleDetailsProps } from '../ArticleDetails';
import { useArticleDataById } from '../../../api/articleApi';
import { useUpdateArticleViews } from '../../../lib/hooks/useUpdateArticleViews/useUpdateArticleViews';

export const ArticleDetailsRedesigned = memo((props: ArticleDetailsProps) => {
    const { t } = useTranslation('articles');
    const { id } = props;

    const { data: article, isLoading, error } = useArticleDataById(id || '');
    useUpdateArticleViews({ id, article, isLoading });
    if (!article) {
        return null;
    }
    const { title, blocks, createdAt, views, subtitle, img } = article;

    if (isLoading) {
        return <ArticleDetailsSkeleton />;
    }

    if (error) {
        return <ArticleDetailsError />;
    }

    const subtitleText = subtitle.text;
    const subtitleLink = subtitle.link;

    return (
        <VStack
            gap="16"
            max
            className={cls.ArticleDetails}
            data-testid="ArticleDetails.Info"
        >
            <Text
                title={title}
                size="l"
                bold
                data-testid="ArticleDetails.Title"
            />
            {!subtitleLink && <Text title={subtitleText} />}
            {subtitleLink && (
                <VStack gap="4">
                    <Text text={subtitleText} />
                    <AppLink to={subtitleLink} target="_blank">
                        {subtitleLink}
                    </AppLink>
                </VStack>
            )}
            <AppImage
                fallback={<Skeleton width="100%" height={420} border="16px" />}
                errorFallback={
                    <AppImage
                        className={cls.img}
                        src={defaultImage}
                        alt={t('Дефолтне зображення картинки статті')}
                    />
                }
                src={img}
                className={cls.img}
                data-testid="ArticleDetails.ArticleImage"
            />
            {blocks.map(renderArticleBlock)}
        </VStack>
    );
});
