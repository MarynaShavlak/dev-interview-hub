import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormValidation } from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useImageUploader } from '@/shared/lib/hooks/useImageUploader/useImageUploader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getRouteArticleDetails } from '@/shared/const/router/router';
import { useArticleEditor } from '../useArticleEditor/useArticleEditor';
import { useArticleContentBlocks } from '../useArticleContentBlocks/useArticleContentBlocks';
import { uploadArticleImageThunk } from '../../../model/services/uploadArticleImageThunk/uploadImageThunk';
import { createArticleThunk } from '../../../model/services/createArticleThunk/createArticleThunk';

export const useArticleCreation = () => {
    const validConfig = useInputValidationConfig();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        formData,
        uploadedArticleImage,
        onFileUpload,
        onResetArticle,
        onChangeHeroImage,
    } = useArticleEditor();

    const { hasErrors, titleErrors, subtitleTextErrors, subtitleLinkErrors } =
        useFormValidation(
            {
                title: formData?.title || '',
                subtitleText: formData?.subtitle.text || '',
                subtitleLink: formData?.subtitle.link || '',
            },
            validConfig,
            'article',
        );
    const {
        blocks,
        createEmptyTextBlock,
        createEmptyCodeBlock,
        createEmptyImageBlock,
        addBlock,
        updateBlock,
        deleteBlock,
        deleteAllBlocks,
    } = useArticleContentBlocks();

    const { imagePreview, error, handleImageChange, resetImage } =
        useImageUploader({
            initialAvatar: '',
            onFileUpload,
        });

    const onCancelCreate = useCallback(() => {
        onResetArticle();
        deleteAllBlocks();
        resetImage();
    }, [deleteAllBlocks, onResetArticle, resetImage]);

    const onSaveCreate = useCallback(async () => {
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
        if (savedArticle?.id) {
            navigate(getRouteArticleDetails(savedArticle.id));
        }
        console.log('save');
        onCancelCreate();
    }, [
        dispatch,
        navigate,
        onCancelCreate,
        onChangeHeroImage,
        uploadedArticleImage,
    ]);

    return {
        // formData,
        hasErrors,
        onCancelCreate,
        onSaveCreate,
        validationErrors: {
            titleErrors,
            subtitleTextErrors,
            subtitleLinkErrors,
        },
        handleHeroImageChange: handleImageChange,
        heroPreview: imagePreview,
        resetHeroImage: resetImage,
        heroFileTypeError: error,
        blocks,
        blockActions: {
            createEmptyTextBlock,
            createEmptyCodeBlock,
            createEmptyImageBlock,
            addBlock,
            updateBlock,
            deleteBlock,
            deleteAllBlocks,
        },
    };
};
