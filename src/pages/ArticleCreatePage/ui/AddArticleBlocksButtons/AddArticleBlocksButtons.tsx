import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { HStack } from '@/shared/ui/common/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface AddArticleBlocksButtonsProps {
    onAddTextBlockBtnClick: () => void;
}

export const AddArticleBlocksButtons = memo(
    (props: AddArticleBlocksButtonsProps) => {
        const { onAddTextBlockBtnClick } = props;
        const { t } = useTranslation('articleDetails');

        return (
            <HStack gap="24">
                <Button
                    variant="filled"
                    addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                    className={cls.addLinkButton}
                    onClick={onAddTextBlockBtnClick}
                >
                    {t('Додати')} {t('блок')}
                    &nbsp;
                    <b>{t('тексту')}</b>
                </Button>
                <Button
                    variant="filled"
                    addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                    className={cls.addLinkButton}
                    onClick={() => console.log('add code block')}
                >
                    {t('Додати')} {t('блок')}
                    &nbsp;
                    <b>{t('коду')}</b>
                </Button>
                <Button
                    variant="filled"
                    addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                    className={cls.addLinkButton}
                    onClick={() => console.log('add image block')}
                >
                    {t('Додати')} {t('блок')}
                    &nbsp;
                    <b>{t('зображення')}</b>
                </Button>
            </HStack>
        );
    },
);
