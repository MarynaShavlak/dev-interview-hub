import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleEditButton } from '@/features/ArticleEditButton';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { User } from '@/entities/User';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleAdditionalInfoProps {
    className?: string;
    author: User;
    createdAt: string;
    views: number;
}

export const ArticleAdditionalInfo = memo(
    (props: ArticleAdditionalInfoProps) => {
        const { className, author, createdAt, views } = props;
        const { t } = useTranslation('article-details');

        return (
            <VStack gap="32" className={classNames('', {}, [className])}>
                <HStack gap="8">
                    <Avatar
                        size={32}
                        src={author.avatar}
                        userName={author.username}
                    />
                    <Text text={createdAt} />
                </HStack>
                <ArticleEditButton />
                <Text text={t('{{count}} переглядів', { count: views })} />
            </VStack>
        );
    },
);
