import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ToggleFeaturesComponent } from '@/shared/lib/features';
import { Modal } from '@/shared/ui/common/Modal';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/common/Drawer';

export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation('articles');
    const [isOpen, setIsOpen] = useState(false);
    const { isArticlesPageWasOpened } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
        }
    }, [dispatch, isArticlesPageWasOpened]);

    const onClose = () => setIsOpen(false);

    const titleText = t('Ласкаво просимо на сторінку перегляду статей');
    const messageText = t(
        'Тут ви можете шукати та переглядати статті на різні теми',
    );

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                <ToggleFeaturesComponent
                    feature="isAppRedesigned"
                    on={<Text title={titleText} text={messageText} />}
                    off={
                        <TextDeprecated title={titleText} text={messageText} />
                    }
                />
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            <ToggleFeaturesComponent
                feature="isAppRedesigned"
                on={<Text title={titleText} text={messageText} />}
                off={<TextDeprecated title={titleText} text={messageText} />}
            />
        </Modal>
    );
});
