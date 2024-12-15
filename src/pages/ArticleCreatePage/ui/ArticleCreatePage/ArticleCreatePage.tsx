import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import cls from './ArticleCreatePage.module.scss';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { OrderCard } from '@/shared/ui/redesigned/OrderCard';
import { Input } from '@/shared/ui/redesigned/Input';

interface ArticleCreatePageProps {
    className?: string;
}

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation('articleDetails');

    return (
        <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
            <VStack gap="24">
                <Text title={t('Створення нової статті')} size="l" />
                <HStack gap="16" align="start">
                    <OrderCard index={1} />
                    {/* <VStack gap="24"> */}
                    {/* <Text text={t('Заголовок статті')} bold /> */}
                    <Input
                        value=""
                        label={t('Заголовок статті')}
                        gap="16"
                        maxWidth={false}

                        // onChange={onChangeUsername}
                        // readonly={readonly}
                        // disabled={readonly}
                        // data-testid="UserCard.username"
                        // validations={validConfig.lastname}
                        // errors={usernameErrors}
                    />
                    {/* </VStack> */}
                </HStack>
            </VStack>
        </Page>
    );
});

export default ArticleCreatePage;
