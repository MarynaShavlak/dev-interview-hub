import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { HStack } from '@/shared/ui/common/Stack';

import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import { Button } from '@/shared/ui/redesigned/Button';

import { useUploadedArticleImage } from '../../model/selectors/getCreateArticleSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { uploadArticleImageThunk } from '../../model/services/uploadArticleImageThunk/uploadImageThunk';
import { createArticleThunk } from '../../model/services/createArticleThunk/createArticleThunk';
import { useCreateArticleActions } from '../../model/slices/createArticleSlice';

interface ArticleCreatePageHeaderProps {
    className?: string;
    hasErrors: boolean;
    deleteAllBlocks: () => void;
}

export const ArticleCreatePageHeader = memo(
    (props: ArticleCreatePageHeaderProps) => {
        const { className, hasErrors, deleteAllBlocks } = props;
        const { t } = useTranslation('articleDetails');
        const { formData, onDeleteAllBlocks } = useCreateArticle();
        console.log('form', formData);
        const isSomeBlockAdded = Number(formData?.blocks.length) > 0;
        const dispatch = useAppDispatch();

        const { onChangeHeroImage } = useCreateArticle();
        const navigate = useNavigate();
        const { resetArticle } = useCreateArticleActions();

        const uploadedArticleImage = useUploadedArticleImage();

        const onSave = useCallback(async () => {
            if (uploadedArticleImage) {
                const url = await dispatch(
                    uploadArticleImageThunk(uploadedArticleImage),
                ).unwrap();
                onChangeHeroImage(url);
            }
            if (uploadedArticleImage == null) {
                onChangeHeroImage('');
            }
            const savedArticle = await dispatch(createArticleThunk()).unwrap();
            // if (savedArticle?.id) {
            //     navigate(getRouteArticleDetails(savedArticle.id));
            // }
        }, [dispatch, onChangeHeroImage, uploadedArticleImage]);

        const onCancelCreate = useCallback(() => {
            resetArticle();
            onDeleteAllBlocks();
            deleteAllBlocks();
        }, [deleteAllBlocks, onDeleteAllBlocks, resetArticle]);

        return (
            <HStack gap="8">
                <Button variant="cancel" onClick={onCancelCreate}>
                    {t('Видалити')}
                </Button>
                <Button
                    variant="save"
                    onClick={onSave}
                    disabled={hasErrors || !isSomeBlockAdded}
                >
                    {t('Зберегти')}
                </Button>
            </HStack>
        );
    },
);
