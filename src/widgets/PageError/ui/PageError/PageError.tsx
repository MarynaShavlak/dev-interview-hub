import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from '@/shared/ui/redesigned/Text';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/common/Stack';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { classNames } from '@/shared/lib/classes/classNames/classNames';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';
import cls from './PageError.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError = memo(({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };
    const errorMessage = t('Виникла непередбачена помилка');
    const btnText = t('Оновити сторінку');
    return (
        <VStack
            className={classNames(cls.PageError, {}, [className])}
            align="center"
            justify="center"
            gap="24"
        >
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={
                    <>
                        <Text text={errorMessage} />
                        <Button onClick={reloadPage}>{btnText}</Button>
                    </>
                }
                off={
                    <>
                        <TextDeprecated text={errorMessage} />
                        <ButtonDeprecated onClick={reloadPage}>
                            {btnText}
                        </ButtonDeprecated>
                    </>
                }
            />
        </VStack>
    );
});
