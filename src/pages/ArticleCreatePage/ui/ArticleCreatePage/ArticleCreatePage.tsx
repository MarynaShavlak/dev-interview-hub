import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { Input } from '@/shared/ui/redesigned/Input';
import { useInputValidationConfig } from '@/shared/lib/hooks/validationHooks/useInputValidationConfig/useInputValidationConfig';

interface ArticleCreatePageProps {
    className?: string;
}

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');
    const validConfig = useInputValidationConfig();
    const [value, setValue] = useState('');
    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            <VStack gap="24">
                <Text title={t('Створення нової статті')} size="l" />
                <HStack gap="16" align="start" max>
                    <OrderCard index={1} />

                    <Input
                        value={value}
                        label={t('Заголовок статті')}
                        labelBold
                        gap="16"
                        maxWidth={false}
                        className={cls.InputName}
                        onChange={(value) => setValue(value)}
                        // readonly={readonly}
                        // disabled={readonly}
                        // data-testid="UserCard.username"
                        validations={validConfig.title}
                        maxLengthIndicator
                        // errors={usernameErrors}
                    />
                    {/* </VStack> */}
                </HStack>
            </VStack>
        </Page>
    );
});

export default ArticleCreatePage;
