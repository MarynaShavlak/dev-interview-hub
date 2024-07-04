import { memo } from 'react';
import {
    useArticleDetailsIsLoading,
    useArticleDetailsData,
} from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Card } from '@/shared/ui/redesigned/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import cls from './AdditionalInfoContainer.module.scss';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

export const AdditionalInfoContainer = memo(() => {
    const article = useArticleDetailsData();
    const isLoading = useArticleDetailsIsLoading();

    if (isLoading) {
        return (
            <Card padding="24" border="round" className={cls.card}>
                <VStack gap="32">
                    <HStack gap="8">
                        <Skeleton width={32} height={32} border="50%" />
                        <Skeleton width={160} height={24} />
                    </HStack>
                    <Skeleton width={120} height={42} border="40px" />
                    <Skeleton width={100} height={24} />
                </VStack>
            </Card>
        );
    }

    if (!article) {
        return null;
    }
    return (
        <Card padding="24" border="round" className={cls.card}>
            <ArticleAdditionalInfo
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
            />
        </Card>
    );
});
