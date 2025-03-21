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

import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { ArticleDetailsProps } from '../ArticleDetails';
import { useArticleDataById } from '../../../api/articleApi';
import { formatDateString } from '@/shared/lib/text/formatDateString/formatDateString';
import { useUpdateArticleViews } from '../../../lib/hooks/useUpdateArticleViews/useUpdateArticleViews';

export const ArticleDetailsDeprecated = memo((props: ArticleDetailsProps) => {
    const { id } = props;
    const { data: article, isLoading, error } = useArticleDataById(id || '');
    // console.log(JSON.stringify(article));
    useUpdateArticleViews({ id, article, isLoading });
    if (!article) {
        return null;
    }

    const { title, blocks, createdAt, views, subtitle, img } = article;
    const subtitleText = subtitle.text;
    const subtitleLink = subtitle.link;

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
                    src={img}
                    className={cls.avatar}
                    data-testid="ArticleDetails.ArticleImage"
                />
            </HStack>
            <VStack gap="4" max>
                {!subtitleLink && (
                    <Text
                        title={title}
                        text={subtitleText}
                        size={TextSize.L}
                        data-testid="ArticleDetails.Title"
                    />
                )}
                {subtitleLink && (
                    <VStack gap="4">
                        <Text
                            title={title}
                            size={TextSize.L}
                            data-testid="ArticleDetails.Title"
                        />
                        <Text text={subtitleText} />
                        <AppLink to={subtitleLink} target="_blank">
                            {subtitleLink}
                        </AppLink>
                    </VStack>
                )}

                <HStack gap="8">
                    <Icon Svg={EyeIcon} width={20} height={20} />
                    <Text
                        text={String(views)}
                        data-testid="ArticleDetails.Views"
                    />
                </HStack>
                <HStack gap="8">
                    <Icon Svg={CalendarIcon} width={20} height={20} />
                    <Text
                        text={formatDateString(createdAt)}
                        data-testid="ArticleDetails.CreatedAt"
                    />
                </HStack>
            </VStack>
            {blocks.map(renderArticleBlock)}
        </VStack>
    );
});
