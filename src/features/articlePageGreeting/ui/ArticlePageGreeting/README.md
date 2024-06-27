# Documentation for 'ArticlePageGreeting' Component

## Overview
The **'ArticlePageGreeting'** component is designed to provide a welcome message to users the first time they visit the articles page. This message is displayed in a modal or drawer, depending on the device type (desktop or mobile). On subsequent visits, the welcome message will not be shown. This functionality is managed through JSON settings.


## Usage
```typescript jsx
import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Drawer } from '@/shared/ui/Drawer';

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

    const text = (
        <Text
            title={t('Ласкаво просимо на сторінку перегляду статей')}
            text={t(
                'Тут ви можете шукати та переглядати статті на різні теми',
            )}
        />
    );

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    );
});
```
## Description
1. **Translation Setup:**
- The component uses the **'useTranslation'** hook from **_'react-i18next'_** to handle translations for the welcome message.
2. **State Management:**
**'isOpen'**: A state to manage the visibility of the modal/drawer.
- **'isArticlesPageWasOpened'**: A value from JSON settings indicating whether the articles page has been opened before.
3. **Effects:**
- On component mount, the **'useEffect'** hook checks if the articles page has been opened before by reading **'isArticlesPageWasOpened'** from JSON settings. If it hasn't, the modal/drawer is set to open, and **'isArticlesPageWasOpened'** is updated to **_'true'_** in JSON settings.
4. **Close Handler:**
- **'onClose'**: A function to set the **'isOpen'** state to **_'false'_**, closing the modal/drawer.
5. **Conditional Rendering:**
- Depending on whether the user is on a mobile device (**'isMobile'**), the component conditionally renders either a **'Drawer'** (for mobile) or a **'Modal'** (for desktop) with the welcome message.

## Functionality
- **First Visit:** When a user visits the articles page for the first time, the **'ArticlePageGreeting'** component displays a welcome message.
- **Subsequent Visits:** On any subsequent visits to the articles page, whether the user refreshes the page, accesses it from a different browser, or navigates away and back, the welcome message will no longer be displayed.

This behavior is managed by saving a setting (**'isArticlesPageWasOpened'**) in JSON settings, ensuring the welcome message is only shown on the initial visit.
