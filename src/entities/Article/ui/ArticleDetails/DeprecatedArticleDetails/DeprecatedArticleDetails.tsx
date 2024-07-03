import { memo } from 'react';
import { renderArticleBlock } from '../renderArticleBlock';
import { useArticleDetailsData } from '../../../model/selectors/articleDetails';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import cls from '../ArticleDetails.module.scss';

export const DeprecatedArticleDetails = memo(() => {
    const article = useArticleDetailsData();

    return (
        <>
            <HStack justify="center" max>
                <Avatar size={200} src={article?.img} className={cls.avatar} />
            </HStack>
            <VStack gap="4" max>
                <Text
                    title={article?.title}
                    text={article?.subtitle}
                    size={TextSize.L}
                />
                <HStack gap="8">
                    <Icon Svg={EyeIcon} />
                    <Text text={String(article?.views)} />
                </HStack>
                <HStack gap="8">
                    <Icon Svg={CalendarIcon} />
                    <Text text={article?.createdAt} />
                </HStack>
            </VStack>
            {article?.blocks.map(renderArticleBlock)}
        </>
    );
});
