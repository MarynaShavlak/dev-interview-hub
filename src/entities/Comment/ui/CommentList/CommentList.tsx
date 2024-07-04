import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Each } from '@/shared/lib/components/Each/Each';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { CommentCard } from '../CommentCard/CommentCard';
import { Comment } from '../../model/types/comment';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const { className, isLoading, comments } = props;
    const { t } = useTranslation('article-details');
    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames('', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        );
    }

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            {comments?.length ? (
                <Each
                    of={comments}
                    render={(item) => (
                        <CommentCard
                            key={item.id}
                            comment={item}
                            isLoading={isLoading}
                        />
                    )}
                />
            ) : (
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text text={t('Коментарів немає')} />}
                    off={<TextDeprecated text={t('Коментарів немає')} />}
                />
            )}
        </VStack>
    );
});
