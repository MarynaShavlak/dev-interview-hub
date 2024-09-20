# ArticlePageGreeting

## Overview
The `ArticlePageGreeting` component provides a welcoming message to users the first time they visit the articles page. It displays this message in a modal on desktop devices and in a drawer on mobile devices. On subsequent visits, the message is not shown again, as this functionality is managed through JSON settings.

## Props
The **`ArticlePageGreeting`** component does not accept any props.

## Features
1. **First Visit Welcome**: Displays a welcome message the first time a user visits the articles page.

2. **Subsequent Visits:** On any subsequent visits to the articles page, whether the user refreshes the page, accesses it from a different browser, or navigates away and back, the welcome message will no longer be displayed.

3. **Persistent Settings**: Uses JSON settings to track whether the user has visited the articles page before, ensuring the welcome message is only shown once.

4. **Device Adaptation**: Renders the message in a modal on desktop devices and in a drawer on mobile devices, providing a responsive user experience.

5. **State Management:**: Manages the visibility of the modal/drawer with the `isOpen` state and checks the visit status with the `isArticlesPageWasOpened` value from JSON settings.

6. **Design Adaptation**: Renders different UI elements based on whether the redesigned interface is enabled or not. This ensures consistency with the application's design system.


## Usage Example
```typescript jsx
import { ArticlePageGreeting } from '@/features/articlePageGreeting';

export const ArticlesPage = () => {
   return (
           <ArticlePageGreeting />
   );
};
```

# Conclusion
The `ArticlePageGreeting` component enhances user experience by providing a friendly welcome message on the first visit to the articles page. 
Its implementation ensures that this message is only shown once per user, utilizing JSON settings to track page visits. 
The component adapts its display mechanism based on the device type, ensuring a consistent and responsive user interface.
