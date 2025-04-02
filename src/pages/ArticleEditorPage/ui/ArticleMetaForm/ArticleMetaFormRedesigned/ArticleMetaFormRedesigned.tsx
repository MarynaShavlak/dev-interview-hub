import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
import { ARTICLE_TO_CREATE_TITLE } from '@/shared/const/localstorage';

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

    const [initialTitle, setInitialTitle] = useState<string>(
        () => sessionStorage.getItem(ARTICLE_TO_CREATE_TITLE) || '',
    );

    // useEffect(() => {
    //     sessionStorage.setItem(ARTICLE_TO_CREATE_TITLE, initialTitle);
    // }, [initialTitle]);

    useEffect(() => {
        const storedTitle = sessionStorage.getItem(ARTICLE_TO_CREATE_TITLE);
        if (storedTitle) {
            sessionStorage.removeItem(ARTICLE_TO_CREATE_TITLE);
        }
    }, []);
    //
    // // Update on change (if needed)
    // useEffect(() => {
    //     if (initialTitle) {
    //         sessionStorage.setItem(ARTICLE_TO_CREATE_TITLE, initialTitle);
    //     }
    // }, [initialTitle]);

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
                    value={title || initialTitle || ''}
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
});
