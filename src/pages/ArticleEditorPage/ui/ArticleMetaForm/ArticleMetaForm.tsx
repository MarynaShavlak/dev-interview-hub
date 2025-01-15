import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/plus.svg';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import cls from './ArticleMetaForm.module.scss';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useArticleEditorState } from '../../lib/hooks/useArticleEditorState/useArticleEditorState';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { ValidationErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';

interface ArticleMetaFormProps {
    titleIndex: number;
    subtitleIndex: number;
    errors: {
        titleErrors: ValidationErrors;
        subtitleTextErrors: ValidationErrors;
        subtitleLinkErrors: ValidationErrors;
    };
}

export const ArticleMetaForm = (props: ArticleMetaFormProps) => {
    const { titleIndex, subtitleIndex, errors } = props;
    const { t } = useTranslation('articleDetails');

    const validConfig = useInputValidationConfig();

    const {
        formData,
        onChangeTitle,
        onChangeSubtitleText,
        onChangeSubtitleLink,
    } = useArticleEditorState();

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

    if (!formData) {
        return null;
    }
    const {
        title,
        subtitle: { text, link },
    } = formData;
    return (
        <VStack gap="24">
            <HStack gap="16" align="start" max>
                <OrderCard index={titleIndex} />

                <Input
                    value={title || ''}
                    label={t('Заголовок статті')}
                    labelBold
                    gap="16"
                    maxWidth
                    onChange={onChangeTitle}
                    validations={validConfig.title}
                    maxLengthIndicator
                    errors={errors.titleErrors}
                />
            </HStack>
            <HStack gap="16" align="start" max>
                <OrderCard index={subtitleIndex} />
                <VStack gap="16">
                    <Input
                        value={text || ''}
                        label={t('Підзаголовок статті')}
                        labelBold
                        gap="16"
                        maxWidth={false}
                        className={cls.titleInput}
                        onChange={onChangeSubtitleText}
                        validations={validConfig.subtitleText}
                        errors={errors.subtitleTextErrors}
                        maxLengthIndicator
                    />

                    {shouldRenderLinkInput && (
                        <Input
                            value={link || ''}
                            label={t('Посилання')}
                            labelBold
                            gap="16"
                            maxWidth={false}
                            className={cls.titleInput}
                            onChange={onChangeSubtitleLink}
                            validations={validConfig.subtitleLink}
                            errors={errors.subtitleLinkErrors}
                        />
                    )}
                </VStack>

                <Button
                    variant="filled"
                    addonLeft={
                        shouldShowAddIcon && (
                            <Icon Svg={AddIcon} width={16} height={16} />
                        )
                    }
                    className={cls.addLinkButton}
                    onClick={handleLinkButtonClick}
                >
                    {linkButtonText}
                </Button>
            </HStack>
        </VStack>
    );
};
