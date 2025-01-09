import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/plus.svg';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { useArticleEditor } from '../../lib/hooks/useArticleEditor/useArticleEditor';
import { useToggleVisibility } from '@/shared/lib/hooks/useToggleVisibility/useToggleVisibility';
import { ValidationErrors } from '@/shared/lib/hooks/validationHooks/useInputErrors/useInputErrors';
import { Article } from '@/entities/Article';

interface TitleSubtitleFormProps {
    titleIndex: number;
    subtitleIndex: number;
    errors: {
        titleErrors: ValidationErrors;
        subtitleTextErrors: ValidationErrors;
        subtitleLinkErrors: ValidationErrors;
    };
    editedArticle?: Article;
    isEditMode?: boolean;
}

export const TitleSubtitleForm = (props: TitleSubtitleFormProps) => {
    const { titleIndex, subtitleIndex, errors, editedArticle, isEditMode } =
        props;
    const { t } = useTranslation('articleDetails');
    const validConfig = useInputValidationConfig();
    const { isVisible: isLinkInputAdded, toggleVisibility: toggleLinkInput } =
        useToggleVisibility();

    const {
        formData,
        onChangeTitle,
        onChangeSubtitleText,
        onChangeSubtitleLink,
    } = useArticleEditor();

    const deleteSubtitleLink = useCallback(() => {
        onChangeSubtitleLink('');
        toggleLinkInput();
    }, [onChangeSubtitleLink, toggleLinkInput]);

    const linkButtonText = isLinkInputAdded
        ? t('Видалити посилання')
        : t('Додати посилання');

    return (
        <VStack gap="24">
            <HStack gap="16" align="start" max>
                <OrderCard index={titleIndex} />

                <Input
                    value={formData?.title || ''}
                    label={t('Заголовок статті')}
                    labelBold
                    gap="16"
                    maxWidth
                    // className={cls.InputName}
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
                        value={formData?.subtitle.text || ''}
                        label={t('Підзаголовок статті')}
                        labelBold
                        gap="16"
                        maxWidth={false}
                        className={cls.InputName}
                        onChange={onChangeSubtitleText}
                        validations={validConfig.subtitleText}
                        errors={errors.subtitleTextErrors}
                        maxLengthIndicator
                    />
                    {isLinkInputAdded && (
                        <Input
                            value={formData?.subtitle.link || ''}
                            label={t('Посилання')}
                            labelBold
                            gap="16"
                            maxWidth={false}
                            className={cls.InputName}
                            onChange={onChangeSubtitleLink}
                            validations={validConfig.subtitleLink}
                            errors={errors.subtitleLinkErrors}
                        />
                    )}
                </VStack>

                <Button
                    variant="filled"
                    addonLeft={
                        !isLinkInputAdded && (
                            <Icon Svg={AddIcon} width={16} height={16} />
                        )
                    }
                    className={cls.addLinkButton}
                    onClick={deleteSubtitleLink}
                >
                    {linkButtonText}
                </Button>
            </HStack>
        </VStack>
    );
};
