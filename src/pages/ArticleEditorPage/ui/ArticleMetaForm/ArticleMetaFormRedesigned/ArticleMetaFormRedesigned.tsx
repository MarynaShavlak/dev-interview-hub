import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityTitleInput } from '@/features/EditorPageComponents';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import AddIcon from '@/shared/assets/icons/plus.svg';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import cls from '../ArticleMetaForm.module.scss';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

import { ArticleMetaFormProps } from '../ArticleMetaForm';
import { useArticleMetaForm } from '../../../lib/hooks/useArticleMetaForm/useArticleMetaForm';

export const ArticleMetaFormRedesigned = memo((props: ArticleMetaFormProps) => {
    const { titleIndex, subtitleIndex, errors } = props;
    const validConfig = useInputValidationConfig();
    const { t } = useTranslation('articleDetails');

    const {
        form,
        shouldRenderLinkInput,
        shouldShowAddIcon,
        linkButtonText,
        handleLinkButtonClick,
    } = useArticleMetaForm();

    const {
        formData,
        onChangeTitle,
        onChangeSubtitleText,
        onChangeSubtitleLink,
    } = form;

    if (!formData) {
        return null;
    }
    const {
        subtitle: { text, link },
    } = formData;

    return (
        <VStack gap="24" max>
            <HStack gap="16" align="start" max>
                <OrderCard index={titleIndex} />
                <EntityTitleInput
                    errors={errors}
                    formData={formData}
                    onChangeTitle={onChangeTitle}
                    entityType="article"
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
});
