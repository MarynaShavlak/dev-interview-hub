import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { AddCommentForm, CommentList } from '@/entities/Comment';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/common/Stack';
import { fetchCommentsByArticleIdThunk } from '../model/services/fetchCommentsByArticleIdThunk/fetchCommentsByArticleIdThunk';
import {
    articleCommentsReducer,
    getArticleComments,
} from '../model/slices/articleCommentsSlice';
import {
    useArticleCommentsError,
    useArticleCommentsIsLoading,
} from '../model/selectors/comments';
import { addCommentForArticleThunk } from '../model/services/addCommentForArticleThunk/addCommentForArticleThunk';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useCommentsByArticleId } from '../api/articleCommentsApi';

export interface ArticleCommentsProps {
    className?: string;
    id?: string;
}

const ArticleComments = memo((props: ArticleCommentsProps) => {
    const { className, id } = props;
    const { t } = useTranslation('articleDetails');
    const comments = useSelector(getArticleComments.selectAll);
    const commentsIsLoading = useArticleCommentsIsLoading();
    const error = useArticleCommentsError();
    const dispatch = useAppDispatch();
    const sectionTitleText = t('Коментарі');

    const { data } = useCommentsByArticleId(id || '');
    console.log('data', data);
    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticleThunk(text));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleIdThunk(id));
    });
    const reducers: ReducersList = {
        articleComments: articleCommentsReducer,
    };

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                gap="16"
                max
                className={className}
                data-testid="article-comments"
            >
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
                <CommentList
                    isLoading={commentsIsLoading}
                    comments={comments}
                    error={error}
                />
            </VStack>
        </DynamicModuleLoader>
    );
});

export default ArticleComments;
