import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import defaultImage from '@/shared/assets/images/default-img-list.png';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { renderArticleBlock } from '../renderArticleBlock';
import { useArticleDetailsData } from '../../../model/selectors/articleDetails';
import { Text } from '@/shared/ui/redesigned/Text';
import cls from '../ArticleDetails.module.scss';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

export const RedesignedArticleDetails = memo(() => {
    const article = useArticleDetailsData();
    const { t } = useTranslation('articles');

    return (
        <>
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
        </>
    );
});
