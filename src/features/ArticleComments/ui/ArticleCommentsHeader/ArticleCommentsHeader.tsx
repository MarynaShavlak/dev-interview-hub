import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { AddCommentForm } from '@/entities/Comment';
import { addCommentForArticleThunk } from '../../model/services/addCommentForArticleThunk/addCommentForArticleThunk';

export const ArticleCommentsHeader = memo(({ id }: { id: string }) => {
    const { t } = useTranslation('articleDetails');
    const dispatch = useAppDispatch();
    const sectionTitleText = t('Коментарі');

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticleThunk({ text, articleId: id }));
        },
        [dispatch, id],
    );

    return (
        <>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text size="l" title={sectionTitleText} />}
                off={
                    <TextDeprecated
                        size={TextSize.L}
                        title={sectionTitleText}
                    />
                }
            />
            <AddCommentForm onSendComment={onSendComment} />
        </>
    );
});
