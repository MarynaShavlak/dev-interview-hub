import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/deprecated/Button';
// import { Icon } from '@/shared/ui/deprecated/Icon';
// import AddIcon from '@/shared/assets/icons/plus.svg';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import cls from '../ArticleMetaForm.module.scss';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

import { ArticleMetaFormProps } from '../ArticleMetaForm';
import { useArticleMetaForm } from '../../../lib/hooks/useArticleMetaForm/useArticleMetaForm';

export const ArticleMetaFormDeprecated = memo((props: ArticleMetaFormProps) => {
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
        title,
        subtitle: { text, link },
    } = formData;
    return (
        <VStack gap="24">
            <HStack gap="16" align="start" max>
                <OrderCard index={titleIndex} />

                <Input
                    value={title || ''}
                    // label={t('Заголовок статті')}
                    // labelBold
                    // gap="16"
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
                        // label={t('Підзаголовок статті')}
                        // labelBold
                        // gap="16"
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
                            // label={t('Посилання')}
                            // labelBold
                            // gap="16"
                            maxWidth={false}
                            className={cls.titleInput}
                            onChange={onChangeSubtitleLink}
                            validations={validConfig.subtitleLink}
                            errors={errors.subtitleLinkErrors}
                        />
                    )}
                </VStack>

                <Button
                    // variant="filled"
                    // addonLeft={
                    //     shouldShowAddIcon && (
                    //         <Icon Svg={AddIcon} width={16} height={16} />
                    //     )
                    // }
                    className={cls.addLinkButton}
                    onClick={handleLinkButtonClick}
                >
                    {linkButtonText}
                </Button>
            </HStack>
        </VStack>
    );
});
