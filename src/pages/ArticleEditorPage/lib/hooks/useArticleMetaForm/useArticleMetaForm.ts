import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { useArticleFormState } from '../useArticleFormState/useArticleFormState';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';

export const useArticleMetaForm = () => {
    const { t } = useTranslation('articleDetails');

    const form = useArticleFormState();
    const { formData, onChangeSubtitleLink } = form;

    const isLinkPresent = Boolean(formData?.subtitle.link);
    const { isVisible: isLinkInputAdded, toggleVisibility: toggleLinkInput } =
        useToggleVisibility(isLinkPresent);

    const deleteSubtitleLink = useCallback(() => {
        onChangeSubtitleLink('');
        toggleLinkInput();
    }, [onChangeSubtitleLink, toggleLinkInput]);

    const handleLinkButtonClick = () => {
        if (isLinkPresent) {
            deleteSubtitleLink();
            toggleLinkInput();
        } else {
            toggleLinkInput();
        }
    };

    const shouldRenderLinkInput = isLinkInputAdded || isLinkPresent;
    const shouldShowAddIcon = !isLinkInputAdded && !isLinkPresent;
    const linkButtonText = shouldRenderLinkInput
        ? t('Видалити посилання')
        : t('Додати посилання');

    return {
        form,
        shouldRenderLinkInput,
        shouldShowAddIcon,
        linkButtonText,
        handleLinkButtonClick,
    };
};
