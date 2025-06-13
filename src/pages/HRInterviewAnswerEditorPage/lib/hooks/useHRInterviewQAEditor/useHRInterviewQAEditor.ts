import { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    useFormValidation,
    UseFormValidationReturnType,
} from '@/shared/lib/hooks/validationHooks/useFormValidation/useFormValidation';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import {
    useHRInterviewQABlocksDisplay,
    UseHRInterviewQABlocksDisplayReturnType,
} from '../useHRInterviewQABlocksDisplay/useHRInterviewQABlocksDisplay';

import { createHRInterviewQAThunk } from '../../../model/services/createHRInterviewQAThunk/createHRInterviewQAThunk';
import { searchClient } from '@/shared/config/firebase/searchClient';
import { updateHRInterviewQAThunk } from '../../../model/services/updateHRInterviewQAThunk/updateHRInterviewQAThunk';
import { useHRInterviewQAData } from '../useHRInterviewQAData/useHRInterviewQAData';
import { useHRInterviewQAFormState } from '../useHRInterviewQAFormState/useHRInterviewQAFormState';
import { deleteHRInterviewQAThunk } from '@/entities/HRInterviewQA';

interface Metadata {
    isEditArticlePage: boolean;
    blocks: UseHRInterviewQABlocksDisplayReturnType['blocks'];
    saveError: string | null;
    isLoading: boolean;
}

interface FormActions {
    onUpdate: () => Promise<string | null>;
    onSave: () => Promise<string | null>;
    onClear: () => void;
    onCancelChanges: () => void;
    onDelete: () => Promise<string | null>;
}

export interface UseHRInterviewQAEditorReturn {
    metadata: Metadata;
    validation: Pick<
        UseFormValidationReturnType,
        'hasInputErrors' | 'titleErrors'
    >;
    blockActions: UseHRInterviewQABlocksDisplayReturnType;
    formActions: FormActions;
}

export const useHRInterviewQAEditor = (): UseHRInterviewQAEditorReturn => {
    const validConfig = useInputValidationConfig();
    const dispatch = useAppDispatch();
    const [saveError, setSaveError] = useState<string | null>(null);

    const { id } = useParams<{ id: string }>();
    const { hrInterviewData, isLoading } = useHRInterviewQAData(id);
    const isEditArticlePage = Boolean(id);

    const { formData, onResetHRInterviewQA } = useHRInterviewQAFormState(
        hrInterviewData,
        isEditArticlePage,
    );

    const { hasInputErrors, titleErrors } = useFormValidation(
        {
            title: formData?.title || '',
        },
        validConfig,
        'article',
    );
    const blockOperations = useHRInterviewQABlocksDisplay(
        isEditArticlePage,
        formData,
    );

    const onClearArticle = useCallback(() => {
        onResetHRInterviewQA();
        blockOperations.clearBlocks();
    }, [blockOperations, onResetHRInterviewQA]);

    const onSaveArticle = useCallback(async () => {
        try {
            setSaveError(null);

            const savedArticle = await dispatch(
                createHRInterviewQAThunk(),
            ).unwrap();
            await searchClient.clearCache();

            if (savedArticle?.id) {
                onClearArticle();
                return savedArticle.id;
            }
            return null;
        } catch (error: any) {
            console.error('Error savingHR interview QA:', error);
            setSaveError(error.message || 'An unexpected error occurred.');
            return null;
        }
    }, [dispatch, onClearArticle]);

    const onDeleteArticle = useCallback(async () => {
        if (!id || !formData) {
            console.error(
                'Article ID is required to delete theHR interview QA.',
            );
            return null;
        }
        try {
            const deletedArticleId = await dispatch(
                deleteHRInterviewQAThunk(formData.id),
            ).unwrap();
            await searchClient.clearCache();

            if (deletedArticleId) {
                onClearArticle();
                return deletedArticleId;
            }

            return null;
        } catch (error: any) {
            console.error('Error deletingHR interview QA:', error);
            setSaveError(
                error.message || 'Failed to delete theHR interview QA.',
            );
            return null;
        }
    }, [dispatch, formData, id, onClearArticle]);

    const onUpdateArticle = useCallback(async () => {
        if (!id || !formData) {
            console.error(
                'Article ID and form data are required to update theHR interview QA.',
            );
            setSaveError('Article data is incomplete.');
            return null;
        }

        try {
            setSaveError(null);

            const updatedArticle = await dispatch(
                updateHRInterviewQAThunk(),
            ).unwrap();
            await searchClient.clearCache();

            if (updatedArticle?.id) {
                console.log(
                    `HR interview QA with ID "${updatedArticle.id}" has been updated.`,
                );
                return updatedArticle.id;
            }

            return null;
        } catch (error: any) {
            console.error('Error updatingHR interview QA:', error);
            setSaveError(
                error.message ||
                    'An error occurred while updating theHR interview QA.',
            );
            return null;
        }
    }, [id, formData, dispatch]);

    const onCancelArticleChanges = useCallback(() => {
        onClearArticle();
    }, [onClearArticle]);

    return {
        metadata: {
            isEditArticlePage,
            blocks: blockOperations.blocks,
            saveError,
            isLoading,
        },

        validation: {
            hasInputErrors,
            titleErrors,
        },

        blockActions: {
            ...blockOperations,
        },
        formActions: {
            onSave: onSaveArticle,
            onClear: onClearArticle,
            onCancelChanges: onCancelArticleChanges,
            onDelete: onDeleteArticle,
            onUpdate: onUpdateArticle,
        },
    };
};
