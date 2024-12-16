import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { Input } from '@/shared/ui/redesigned/Input';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';
import { Button } from '@/shared/ui/redesigned/Button';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { useCreateArticle } from '../../lib/hooks/useCreateArticle/useCreateArticle';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { createArticleReducer } from '../../model/slices/createArticleSlice';

interface ArticleCreatePageProps {
    className?: string;
}

export const useToggleVisibility = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const toggleVisibility = useCallback(() => {
        setIsVisible((prev) => !prev);
    }, []);

    return { isVisible, toggleVisibility };
};

const reducers: ReducersList = {
    createArticle: createArticleReducer,
};

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');
    const validConfig = useInputValidationConfig();
    const [value, setValue] = useState('');
    const { isVisible: isLinkInputAdded, toggleVisibility: toggleLinkInput } =
        useToggleVisibility();

    const {
        formData,
        onChangeTitle,
        onChangeSubtitleText,
        onChangeSubtitleLink,
        error,
        isLoading,
        // readonly,
        // onChangeFirstname,
        // onChangeLastname,
        // onChangeUsername,
        // onChangeAvatar,
        // onChangeCountry,
        // onChangeCurrency,
        // onChangeAge,
        // onChangeCity,
        // onFileUpload,
    } = useCreateArticle();
    console.log('formData', formData);

    const linkButtonText = isLinkInputAdded
        ? t('Видалити посилання')
        : t('Додати посилання');

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
                <VStack gap="24">
                    <Text title={t('Створення нової статті')} size="l" />
                    <HStack gap="16" align="start" max>
                        <OrderCard index={1} />

                        <Input
                            value={formData?.title || ''}
                            label={t('Заголовок статті')}
                            labelBold
                            gap="16"
                            maxWidth={false}
                            className={cls.InputName}
                            onChange={onChangeTitle}
                            // readonly={readonly}
                            // disabled={readonly}
                            // data-testid="UserCard.username"
                            validations={validConfig.title}
                            maxLengthIndicator
                            // errors={usernameErrors}
                        />
                        {/* </VStack> */}
                    </HStack>

                    <HStack gap="16" align="start" max>
                        <OrderCard index={2} />
                        <VStack gap="16">
                            <Input
                                value={formData?.subtitle.text || ''}
                                label={t('Підзаголовок статті')}
                                labelBold
                                gap="16"
                                maxWidth={false}
                                className={cls.InputName}
                                onChange={onChangeSubtitleText}
                                validations={validConfig.subtitle}
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
                                    validations={validConfig.subtitle}
                                    maxLengthIndicator
                                />
                            )}
                        </VStack>

                        <Button
                            variant="filled"
                            addonLeft={
                                !isLinkInputAdded && (
                                    <Icon
                                        Svg={AddIcon}
                                        width={16}
                                        height={16}
                                    />
                                )
                            }
                            className={cls.addLinkButton}
                            onClick={toggleLinkInput}
                        >
                            {linkButtonText}
                        </Button>
                    </HStack>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;
