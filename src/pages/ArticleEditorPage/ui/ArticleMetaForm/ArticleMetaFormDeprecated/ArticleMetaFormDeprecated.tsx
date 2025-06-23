import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { EntityTitleInput } from '@/features/EditorPageComponents';
import { Input } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/deprecated/Button';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import AddIcon from '@/shared/assets/icons/plus.svg';

import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/deprecated/OrderCard';
import cls from '../ArticleMetaForm.module.scss';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

import { ArticleMetaFormProps } from '../ArticleMetaForm';
import { useArticleMetaForm } from '../../../lib/hooks/useArticleMetaForm/useArticleMetaForm';
import { getFlexClasses } from '@/shared/lib/classes/getFlexClasses/getFlexClasses';
import { classNames } from '@/shared/lib/classes/classNames/classNames';

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
        subtitle: { text, link },
    } = formData;

    const btnClasses = getFlexClasses({
        hStack: true,
        gap: '8',
        justify: 'center',
        align: 'center',
    });
    return (
        <VStack gap="24">
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
                    <VStack gap="8" max className={cls.titleInputDeprecated}>
                        <Text
                            title={t('Підзаголовок статті')}
                            size={TextSize.M}
                        />
                        <Input
                            value={text || ''}
                            maxWidth={false}
                            className={cls.titleInputDeprecated}
                            onChange={onChangeSubtitleText}
                            validations={validConfig.subtitleText}
                            errors={errors.subtitleTextErrors}
                            maxLengthIndicator
                            withBorder
                        />
                    </VStack>

                    {shouldRenderLinkInput && (
                        <Input
                            value={link || ''}
                            maxWidth={false}
                            className={cls.titleInput}
                            onChange={onChangeSubtitleLink}
                            validations={validConfig.subtitleLink}
                            errors={errors.subtitleLinkErrors}
                            withBorder
                        />
                    )}
                </VStack>

                <Button
                    className={classNames(cls.addLinkButton, {}, btnClasses)}
                    onClick={handleLinkButtonClick}
                >
                    {shouldShowAddIcon && (
                        <Icon Svg={AddIcon} width={16} height={16} />
                    )}
                    {linkButtonText}
                </Button>
            </HStack>
        </VStack>
    );
});
