import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import cls from '../ArticleCreatePage/ArticleCreatePage.module.scss';
import { HStack, VStack } from '@/shared/ui/common/Stack';
import { Button } from '@/shared/ui/redesigned/Button';
import AddIcon from '@/shared/assets/icons/plus.svg';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { FlexDirection } from '@/shared/types/flexTypes';

interface AddArticleBlocksButtonsProps {
    onAddTextBlockBtnClick: () => void;
    onAddCodeBlockBtnClick: () => void;
    onAddImageBlockBtnClick?: () => void;
    direction: FlexDirection;
    className?: string;
}

export const AddArticleBlocksButtons = memo(
    (props: AddArticleBlocksButtonsProps) => {
        const {
            onAddTextBlockBtnClick,
            onAddImageBlockBtnClick,
            onAddCodeBlockBtnClick,
            direction,
            className,
        } = props;
        const { t } = useTranslation('articleDetails');
        const Wrapper = direction === 'row' ? HStack : VStack;

        return (
            <>
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
                    onClick={onAddCodeBlockBtnClick}
                >
                    {t('Додати')} {t('блок')}
                    &nbsp;
                    <b>{t('коду')}</b>
                </Button>
                <Button
                    variant="filled"
                    addonLeft={<Icon Svg={AddIcon} width={16} height={16} />}
                    className={cls.addLinkButton}
                    onClick={onAddImageBlockBtnClick}
                >
                    {t('Додати')} {t('блок')}
                    &nbsp;
                    <b>{t('зображення')}</b>
                </Button>
            </>
        );
    },
);
